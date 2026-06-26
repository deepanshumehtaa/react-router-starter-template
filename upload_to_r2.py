#!/usr/bin/env python3
import os
import sys
import argparse
import mimetypes
from pathlib import Path

try:
    import boto3
    from botocore.config import Config
except ImportError:
    print("Error: The 'boto3' library is required. Please install it using: pip install boto3")
    sys.exit(1)

# Load .env file manually if python-dotenv is installed
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

# Cloudflare R2 configuration from your screenshot
CLOUDFLARE_ACCOUNT_ID = "cc7e449da51d05c7116be0db80ecd66c"
R2_BUCKET_NAME = "deepanshu"
R2_ENDPOINT_URL = f"https://{CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com"
PUBLIC_DEV_URL = "https://pub-05eb89d5144d4ab3969ec8e7651694c0.r2.dev"

def get_r2_client(access_key, secret_key):
    """Initializes and returns the boto3 R2 client."""
    return boto3.client(
        service_name="s3",
        endpoint_url=R2_ENDPOINT_URL,
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        config=Config(signature_version="s3v4"),
        region_name="auto"
    )

def upload_file(client, local_path: Path, r2_key: str):
    """Uploads a single file to R2 with correct Content-Type."""
    # Detect mime type so browser displays it inline rather than downloading it
    content_type, _ = mimetypes.guess_type(local_path)
    if not content_type:
        content_type = "application/octet-stream"

    print(f"Uploading '{local_path.name}' to R2 as '{r2_key}' (Type: {content_type})...")
    
    try:
        with open(local_path, "rb") as f:
            client.put_object(
                Bucket=R2_BUCKET_NAME,
                Key=r2_key,
                Body=f,
                ContentType=content_type
            )
        
        public_url = f"{PUBLIC_DEV_URL}/{r2_key}"
        print(f"✓ Success! Public URL: {public_url}\n")
        return public_url
    except Exception as e:
        print(f"✗ Failed to upload {local_path.name}: {e}\n")
        return None

def main():
    parser = argparse.ArgumentParser(
        description="Upload local images to Cloudflare R2 bucket and get their public URLs."
    )
    parser.add_argument(
        "path",
        help="Path to a local file or directory to upload."
    )
    parser.add_argument(
        "--key-prefix",
        default="",
        help="Optional folder prefix in the R2 bucket (e.g. 'gallery/')."
    )
    
    args = parser.parse_args()
    
    # Retrieve credentials from environment variables or prompt the user
    access_key = os.environ.get("R2_ACCESS_KEY_ID")
    secret_key = os.environ.get("R2_SECRET_ACCESS_KEY")
    
    if not access_key or not secret_key:
        print("Cloudflare R2 credentials not found in environment variables.")
        print("Please configure R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY in your .env file or environment.")
        print("-" * 60)
        access_key = input("Enter your R2 Access Key ID: ").strip()
        secret_key = input("Enter your R2 Secret Access Key: ").strip()
        
        if not access_key or not secret_key:
            print("Error: Both Access Key ID and Secret Access Key are required.")
            sys.exit(1)
            
    local_path = Path(args.path)
    if not local_path.exists():
        print(f"Error: Path '{local_path}' does not exist.")
        sys.exit(1)
        
    client = get_r2_client(access_key, secret_key)
    
    uploaded_urls = []
    
    # If path is a file
    if local_path.is_file():
        r2_key = f"{args.key_prefix}{local_path.name}"
        url = upload_file(client, local_path, r2_key)
        if url:
            uploaded_urls.append(url)
            
    # If path is a directory
    elif local_path.is_dir():
        image_extensions = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"}
        files = [p for p in local_path.iterdir() if p.is_file() and p.suffix.lower() in image_extensions]
        
        if not files:
            print(f"No image files found in '{local_path}'. Supported formats: {', '.join(image_extensions)}")
            sys.exit(0)
            
        print(f"Found {len(files)} images in '{local_path}'. Starting batch upload...\n")
        for file_path in files:
            r2_key = f"{args.key_prefix}{file_path.name}"
            url = upload_file(client, file_path, r2_key)
            if url:
                uploaded_urls.append(url)
                
    if uploaded_urls:
        print("=" * 60)
        print("UPLOAD COMPLETE. PUBLIC IMAGE URLS:")
        print("=" * 60)
        for url in uploaded_urls:
            print(url)
        print("=" * 60)

if __name__ == "__main__":
    main()
