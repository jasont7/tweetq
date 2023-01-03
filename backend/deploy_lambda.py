import os
import boto3
from dotenv import load_dotenv

load_dotenv()
aws_region = os.environ.get("AWS_REGION_NAME")
aws_access_key = os.environ.get("AWS_ACCESS_KEY_ID")
aws_secret_key = os.environ.get("AWS_SECRET_ACCESS_KEY")

os.system("pip install -r requirements.txt --target ./package --upgrade")
os.system("cd package; zip -r ../deployment-package.zip .")
os.system("zip deployment-package.zip lambda_function.py")

client = boto3.client('lambda', 
	region_name=aws_region, 
	aws_access_key_id=aws_access_key, 
	aws_secret_access_key=aws_secret_key
)

client.update_function_code(
	FunctionName=f'TwitterAdvancedSearch',
	ZipFile=open(f'deployment-package.zip', 'rb').read()
)

os.remove(f'deployment-package.zip')
