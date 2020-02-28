from django.shortcuts import render

# Create your views here.
def real_time(request):
    return render(request, 'real_time.html')