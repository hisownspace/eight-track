from flask import Blueprint, jsonify, request
from flask_login import login_required
import os
import boto3
from botocore.exceptions import ClientError
import botocore


bucket_name = os.environ.get("S3_MUSIC_BUCKET")


s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("S3_KEY"),
   aws_secret_access_key=os.environ.get("S3_SECRET")
)

presign_routes = Blueprint('api/presign', __name__)

@presign_routes.route('/<string:key>')
def get_presigned_url(key):

    try:
        response = s3.generate_presigned_url \
        ('get_object',
            Params={'Bucket': bucket_name,
                    'Key': key},
            ExpiresIn=3600)
    except ClientError as e:
        return None
    # The response contains the presigned URL
    return { "response": response }
