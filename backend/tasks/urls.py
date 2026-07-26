from django.urls import path

from .views import (
    TaskListCreateView,
    TaskDetailView,
    DashboardView,
)

urlpatterns = [

    path(
        "dashboard/",
        DashboardView.as_view(),
        name="dashboard",
    ),

    path(
        "",
        TaskListCreateView.as_view(),
        name="task-list-create",
    ),

    path(
        "<int:pk>/",
        TaskDetailView.as_view(),
        name="task-detail",
    ),

]