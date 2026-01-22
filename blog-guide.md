# How to Add Photos and Content to Your Blog

## 📸 Adding Photos

### Step 1: Upload Photos to Images Folder
1. Save your travel photos in the `images/` folder
2. Name them clearly (e.g., `iceland-northern-lights.jpg`, `iceland-restaurant-food.jpg`)
3. Recommended size: 1200x800 pixels for blog covers, 800x800 for gallery

### Step 2: Add Photos to Blog Posts
Replace this code in `blog.html`:
```html
<div class="h-48 bg-cover bg-center" style="background-image: url('images/1.jpg');">
```

With your photo:
```html
<div class="h-48 bg-cover bg-center" style="background-image: url('images/your-photo-name.jpg');">
```

### Step 3: Add Photos to Gallery
Replace this code:
```html
<div class="aspect-square bg-gradient-to-br from-pink-300 to-purple-400 rounded-lg flex items-center justify-center">
```

With your photo:
```html
<div class="aspect-square bg-cover bg-center rounded-lg shadow-md hover:shadow-lg transition cursor-pointer" style="background-image: url('images/your-photo.jpg');">
</div>
```

## ✍️ Writing Blog Content

### Step 1: Update Blog Post Titles
Find this line:
```html
<h3 class="text-xl font-bold text-gray-800 mb-2">Your Title Here</h3>
```

### Step 2: Update Blog Post Content
Find this section:
```html
<p class="text-gray-600 mb-4">Your content here...</p>
```

### Step 3: Add Restaurant Reviews
Use this template:
```html
<div class="bg-gray-50 rounded-lg p-4 mb-4">
    <h4 class="font-bold text-gray-800 mb-2">🍽️ Restaurant Name</h4>
    <p class="text-gray-600 mb-2">Your review and experience...</p>
    <div class="flex items-center">
        <span class="text-yellow-500">⭐⭐⭐⭐⭐</span>
        <span class="text-gray-500 ml-2 text-sm">Must try!</span>
    </div>
</div>
```

## 🗺️ Adding Hidden Spots
Use this template:
```html
<div class="bg-blue-50 rounded-lg p-4 mb-4">
    <h4 class="font-bold text-gray-800 mb-2">📍 Hidden Spot Name</h4>
    <p class="text-gray-600 mb-2">Description of the location...</p>
    <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Local Secret</span>
</div>
```

## 🎥 Adding Videos
Replace video placeholders with:
```html
<video controls class="w-full rounded-lg">
    <source src="videos/your-video.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>
```

Or embed from social media:
```html
<iframe src="https://www.tiktok.com/embed/your-video-id" width="100%" height="400"></iframe>
```