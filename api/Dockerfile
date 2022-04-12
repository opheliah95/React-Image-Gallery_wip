FROM python:3.8.9

WORKDIR /app

EXPOSE 5050

COPY Pipfile Pipfile.lock ./

RUN pip install pipenv
RUN pipenv lock -r > depdencies.txt
RUN pip install -r depdencies.txt

COPY . ./

CMD [ "python", "./main.py" ]