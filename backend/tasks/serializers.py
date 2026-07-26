from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):

    created_by = serializers.ReadOnlyField(
        source="created_by.email"
    )

    class Meta:
        model = Task

        fields = (
            "id",
            "title",
            "description",
            "status",
            "created_by",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "created_by",
            "created_at",
            "updated_at",
        )