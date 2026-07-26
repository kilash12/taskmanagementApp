from django.db.models import Q

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Task
from .serializers import TaskSerializer
from .permissions import IsTaskOwner
from rest_framework.views import APIView
from rest_framework.response import Response

class TaskListCreateView(generics.ListCreateAPIView):

    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Task.objects.filter(created_by=self.request.user)

        search = self.request.query_params.get("search")
        status = self.request.query_params.get("status")

        if search:
            queryset = queryset.filter(
                Q(title__icontains=search)
            )

        if status:
            queryset = queryset.filter(status=status)

        return queryset

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):

    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated, IsTaskOwner]

    def get_queryset(self):
        return Task.objects.filter(created_by=self.request.user)
class DashboardView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        tasks = Task.objects.filter(created_by=request.user)

        data = {

            "user": request.user.full_name,

            "total_tasks": tasks.count(),

            "pending_tasks": tasks.filter(
                status="Pending"
            ).count(),

            "in_progress_tasks": tasks.filter(
                status="In Progress"
            ).count(),

            "completed_tasks": tasks.filter(
                status="Completed"
            ).count(),

        }

        return Response(data)