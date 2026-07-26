from rest_framework.permissions import BasePermission


class IsTaskOwner(BasePermission):
    """
    Allow only the owner of the task.
    """

    def has_object_permission(self, request, view, obj):
        return obj.created_by == request.user