from django.shortcuts import render, get_object_or_404, redirect
from .models import Product
from django.db.models.functions import Random


# 🏠 หน้าแรก + ค้นหา
def home(request):
    q = request.GET.get('q')
    category = request.GET.get('category')

    products = Product.objects.all()

    if q:
        products = products.filter(name__icontains=q)

    if category:
        products = products.filter(category__icontains=category)

    return render(request, 'index.html', {'products': products})


# ✏️ แก้ไขสินค้า
def edit_product(request, id):
    product = get_object_or_404(Product, id=id)

    if request.method == 'POST':
        product.name = request.POST.get('name')
        product.price = request.POST.get('price')
        product.category = request.POST.get('category')
        product.image = request.POST.get('image')
        product.save()
        return redirect('home')

    return render(request, 'edit.html', {'p': product})


# ❌ ลบสินค้า
def delete_product(request, id):
    product = get_object_or_404(Product, id=id)
    product.delete()
    return redirect('home')

