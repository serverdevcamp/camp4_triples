from django.shortcuts import render


# Create your views here.
def fileupload(request):
    return render(request, 'upload.html')

def postupload(request):
    return render(request, 'postupload.html')
