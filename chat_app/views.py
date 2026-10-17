from django.shortcuts import render

# Create your views here.

def chat_view(requests):
    return render(requests, 'chat-app/chat.html')