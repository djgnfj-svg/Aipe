from rest_framework import serializers

from aimodules.models import Ai_Module

class Module_Serializer(serializers.ModelSerializer):
    href = serializers.SerializerMethodField()

    class Meta:
        model = Ai_Module
        exclude = ('created_at', 'updated_at')
    
    def get_href(self, obj):
        # request 객체를 context에서 가져옵니다.
        request = self.context.get('request')
        if request is not None:
            # 모듈의 상세 페이지로 이동하는 절대 URL을 생성합니다.
            return f'/products/{obj.pk}/'
        return None
