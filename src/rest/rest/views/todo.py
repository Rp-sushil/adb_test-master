from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from pymongo import MongoClient

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']

class TodoListView(APIView):

    def get(self, request):
        # Implement this method - return all todo items from db instance above.
        cursor = db['todo'].find({})
        allTasks = []
        for document in cursor:
            allTasks.append({ "title": document["title"]})
        return Response(allTasks, status=status.HTTP_200_OK)
        
    def post(self, request):
        # Implement this method - accept a todo item in a mongo collection, persist it using db instance above.
        task = request.data
        if "title" in task and len(task.keys()) == 1:
            db['todo'].insert_one(task)
            return Response({"successfully added task!"}, status=status.HTTP_200_OK) 
        else:
            return Response({"Please provide valid input!"}, status=status.HTTP_400_BAD_REQUEST)

