from PIL import Image

# Open the image
img = Image.open('C:/Users/cheth/OneDrive/Desktop/portfolio/client/public/karnataka-map.png')
img = img.convert("RGBA")

# Get data
datas = img.getdata()

newData = []
for item in datas:
    # item is (R, G, B, A)
    # If the pixel is very dark (close to black), make it transparent
    # Let's say if R, G, B are all < 50
    if item[0] < 50 and item[1] < 50 and item[2] < 50:
        newData.append((255, 255, 255, 0)) # transparent
    else:
        # Keep it, but maybe force it to white so the outline is pure white
        # and preserve its original alpha (or set to 255)
        # Actually, if it's anti-aliased, we should scale the alpha based on brightness
        brightness = int((item[0] + item[1] + item[2]) / 3)
        # We can map brightness to alpha. If brightness is 255, alpha is 255.
        newData.append((255, 255, 255, brightness))

img.putdata(newData)
img.save('C:/Users/cheth/OneDrive/Desktop/portfolio/client/public/karnataka-map-transparent.png', "PNG")
print("Saved transparent image")
