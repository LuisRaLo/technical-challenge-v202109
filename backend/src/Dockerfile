# start by pulling the python image
FROM python:3.10-alpine

# switch working directory
WORKDIR /app

# copy the requirements file into the image
COPY requirements.txt requirements.txt

RUN apk add gcc mariadb-connector-c-dev musl-dev


# install the dependencies and packages in the requirements file
RUN pip3 install -r requirements.txt

# copy every content from the local file to the image
COPY . /app

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]