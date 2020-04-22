echo "Building angular app...."
ng build --prod --aot
echo "Copying dist file elements to S3 bucket ... shrawin-frontend ..."
aws s3 cp ./dist/todo s3://shrawin-frontend --recursive