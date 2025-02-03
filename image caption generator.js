const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const generateCaptionBtn = document.getElementById('generateCaptionBtn');
const captionResult = document.getElementById('captionResult');

let uploadedImage = null;

// Handle Image Upload Preview
imageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedImage = e.target.result;
      imagePreview.src = uploadedImage;
    };
    reader.readAsDataURL(file);
  }
});

// Generate Caption Using OpenAI
generateCaptionBtn.addEventListener('click', async () => {
  if (!uploadedImage) {
    alert("Please upload an image first!");
    return;
  }

  captionResult.textContent = "Generating caption...";

  try {
    // Replace with your OpenAI API key
    const apiKey = "YOUR_OPENAI_API_KEY";

    const response = await fetch("https://api.openai.com/v1/images/generate-caption", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({ image_data: uploadedImage })
    });

    if (response.ok) {
      const data = await response.json();
      captionResult.textContent = `Caption: ${data.caption}`;
    } else {
      captionResult.textContent = "Failed to generate caption.";
    }
  } catch (error) {
    captionResult.textContent = "Error generating caption.";
    console.error(error);
  }
});
