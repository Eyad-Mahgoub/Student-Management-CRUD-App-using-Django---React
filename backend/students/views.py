from django.http.response import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http.response import JsonResponse
from .models import Student
from .serializers import StudentSerializer
from django.shortcuts import render

# Create your views here.
class StudentView(APIView):
    def post(self, request):
        data = request.data
        serializer = StudentSerializer(data=data)
        
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Student Added Successfully", safe=False)
            # return Response(serializer.data)

        return JsonResponse("Failed to Add Student", safe=False)
    
    def get_student(self, pk):
        try:
            student = Student.objects.get(studentId=pk)
            return student
        except Student.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        if pk:
            data = self.get_student(pk)
            serializer = StudentSerializer(data)
        else: 
            data = Student.objects.all()
            serializer = StudentSerializer(data, many=True)
        
        return Response(serializer.data)
    
    def put(self, request, pk):
        student_to_update = Student.objects.get(studentId=pk)
        serializer = StudentSerializer(instance=student_to_update, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Student Updated Successfully", safe=False)
        
        return JsonResponse("Failed to Update Student")
    
    def delete(self, request, pk):
        try:
            student_to_delete = Student.objects.get(studentId=pk)
            student_to_delete.delete()
            
            return JsonResponse("Student Deleted Successfully", safe=False)
        except Student.DoesNotExist:
            raise Http404