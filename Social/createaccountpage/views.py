from django.shortcuts import render

# Create your views here.
def createaccount(request):
    return render(request, 'createaccount.html')