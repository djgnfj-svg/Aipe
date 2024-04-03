from rest_framework import routers

from api.viewset.Nood_Viewset import Nood_Viewset
from api.viewset.Module_Viewset import Module_Viewset

# from api.viewset.diet_viewset import DietViewset
# from api.viewset.food_viewset import FoodCategoryViewset, FoodViewset
# from api.viewset.meal_viewset import MealViewset
# from api.viewset.userprofile_viewset import UserProfileView
# from api.viewset.week_diet_viewset import WeekDietViewSet

router = routers.DefaultRouter()
router.register(r'noods', Nood_Viewset, basename="diets")
router.register(r'moduls', Module_Viewset, basename="week-diet")
# router.register(r'foods', FoodViewset, basename="food")
# router.register(r'food-category', FoodCategoryViewset, basename="food-category")
# router.register(r'meals', MealViewset, basename="meals")
# router.register(r'userprofile', UserProfileView, basename="userprofile")