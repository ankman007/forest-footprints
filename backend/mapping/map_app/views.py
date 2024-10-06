import json
from .models import User, Campaign
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.forms.models import model_to_dict
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
@csrf_exempt
@api_view(['POST'])
def register(request):
    data = json.loads(request.body)

    # Validate required fields
    if 'username' not in data or 'password' not in data or 'email' not in data:
        return Response({"message": "Username, email, and password are required", "success": True}, status=400)

    # Check for existing user
    if User.objects.filter(username=data['username']).exists():
        return Response({"message": "Username already exists", "success": False}, status=409)

    if User.objects.filter(email=data['email']).exists():
        return Response({"message": "Email already exists", "success": False}, status=409)

    try:
        user = User.objects.create_user(
                username=data['username'],
                password=data['password'],
                email=data['email']
        )
        user.save()
        return Response({"message": "User registered successfully", "success": True}, status=201)

    except Exception as e:
        return Response({"message": "Registration failed", "error": str(e), "success": False}, status=500)


@csrf_exempt
@api_view(['POST'])
def login(request):
    data = json.loads(request.body)
    print(data)
    # Validate required fields
    if 'username' not in data or 'password' not in data:
        return Response({"message": "Username and password are required", "success": False}, status=400)

    user = authenticate(username=data['username'], password=data['password'])

    if user is not None:
        user_email = User.objects.get(username=data["username"]).email
        token, created = Token.objects.get_or_create(user=user)
        return Response({"message": "Login successful", "token": token.key, "success": True, "email":user_email}, status=200)
    else:
        return Response({"message": "Invalid username or password", "success": False}, status=401)

@csrf_exempt
@api_view(['POST'])
def createEvent(request):
    data = json.loads(request.body)

    # Validate required fields
    if 'username' not in data or 'description' not in data or 'date' not in data or 'location' not in data:
        return Response({"message": "Username, description, date and location are required"}, status=400, success= False)

    try:
        event = Campaign.objects.create(
            organizer = User.objects.get(username=data['username']),
            description=data['description'],
            date=data['date'],
            location=data['location']
        )
        event.save()
        return Response({"message": "Event created successfully"}, status=201, success= True)

    except Exception as e:
        return Response({"message": "Event creation failed", "error": str(e)}, status=500, success= False)


@csrf_exempt
@api_view(['GET'])
def getEvents(request):
    events = Campaign.objects.all()
    eventsList = []
    for event in events:
        event_dict = model_to_dict(event, fields={'organizer', "description", "date", "location"})
        event_dict['organizer'] = event.organizer.username
        eventsList.append(event_dict)
    print(eventsList)
    return Response({"data": eventsList, "success": True}, status=200)