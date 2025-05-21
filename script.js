document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })
  }

  // Product Image Gallery
  const mainImage = document.getElementById("main-product-image")
  const thumbnails = document.querySelectorAll(".thumbnail")

  if (thumbnails.length > 0) {
    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", function () {
        // Remove active class from all thumbnails
        thumbnails.forEach((thumb) => thumb.classList.remove("active"))

        // Add active class to clicked thumbnail
        this.classList.add("active")

        // Update main image
        const imageUrl = this.getAttribute("data-image")
        mainImage.src = imageUrl
      })
    })
  }

  // Quantity Selector
  const quantityInputs = document.querySelectorAll(".quantity-selector input")

  if (quantityInputs.length > 0) {
    quantityInputs.forEach((input) => {
      const minusBtn = input.previousElementSibling
      const plusBtn = input.nextElementSibling

      minusBtn.addEventListener("click", () => {
        let value = Number.parseInt(input.value)
        if (value > 1) {
          value--
          input.value = value
          updateCartItemTotal(input)
        }
      })

      plusBtn.addEventListener("click", () => {
        let value = Number.parseInt(input.value)
        const max = Number.parseInt(input.getAttribute("max")) || 10
        if (value < max) {
          value++
          input.value = value
          updateCartItemTotal(input)
        }
      })

      input.addEventListener("change", () => {
        const value = Number.parseInt(input.value)
        const min = Number.parseInt(input.getAttribute("min")) || 1
        const max = Number.parseInt(input.getAttribute("max")) || 10

        if (value < min) {
          input.value = min
        } else if (value > max) {
          input.value = max
        }

        updateCartItemTotal(input)
      })
    })
  }

  // Update cart item total
  function updateCartItemTotal(input) {
    const cartItem = input.closest(".cart-item")
    if (cartItem) {
      const price = Number.parseFloat(cartItem.querySelector(".product-price").textContent.replace("$", ""))
      const quantity = Number.parseInt(input.value)
      const subtotal = price * quantity
      cartItem.querySelector(".product-subtotal").textContent = "$" + subtotal.toFixed(2)

      updateCartTotal()
    }
  }

  // Update cart total
  function updateCartTotal() {
    const subtotals = document.querySelectorAll(".product-subtotal")
    let total = 0

    subtotals.forEach((subtotal) => {
      total += Number.parseFloat(subtotal.textContent.replace("$", ""))
    })

    const totalElement = document.querySelector(".summary-row.total span:last-child")
    if (totalElement) {
      totalElement.textContent = "$" + total.toFixed(2)
    }
  }

  // Remove cart item
  const removeButtons = document.querySelectorAll(".remove-item")

  if (removeButtons.length > 0) {
    removeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const cartItem = this.closest(".cart-item")
        cartItem.remove()
        updateCartTotal()

        // Update cart count
        const cartCount = document.querySelector(".cart-count")
        if (cartCount) {
          let count = Number.parseInt(cartCount.textContent)
          if (count > 0) {
            count--
            cartCount.textContent = count
          }
        }
      })
    })
  }

  // Product Tabs
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabPanels = document.querySelectorAll(".tab-panel")

  if (tabButtons.length > 0) {
    tabButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons and panels
        tabButtons.forEach((btn) => btn.classList.remove("active"))
        tabPanels.forEach((panel) => panel.classList.remove("active"))

        // Add active class to clicked button
        this.classList.add("active")

        // Show corresponding panel
        const tabId = this.getAttribute("data-tab")
        document.getElementById(tabId).classList.add("active")
      })
    })
  }

  // Rating Selection
  const ratingStars = document.querySelectorAll(".rating-select i")

  if (ratingStars.length > 0) {
    ratingStars.forEach((star) => {
      star.addEventListener("click", function () {
        const rating = Number.parseInt(this.getAttribute("data-rating"))

        // Reset all stars
        ratingStars.forEach((s) => (s.className = "far fa-star"))

        // Fill stars up to selected rating
        for (let i = 0; i < rating; i++) {
          ratingStars[i].className = "fas fa-star"
        }
      })

      star.addEventListener("mouseover", function () {
        const rating = Number.parseInt(this.getAttribute("data-rating"))

        // Reset all stars
        ratingStars.forEach((s) => (s.className = "far fa-star"))

        // Fill stars up to hovered rating
        for (let i = 0; i < rating; i++) {
          ratingStars[i].className = "fas fa-star"
        }
      })

      star.addEventListener("mouseout", () => {
        // Reset to selected rating
        const selectedRating = document.querySelector(".rating-select i.active")
        if (selectedRating) {
          const rating = Number.parseInt(selectedRating.getAttribute("data-rating"))

          // Reset all stars
          ratingStars.forEach((s) => (s.className = "far fa-star"))

          // Fill stars up to selected rating
          for (let i = 0; i < rating; i++) {
            ratingStars[i].className = "fas fa-star"
          }
        } else {
          // No rating selected, reset all
          ratingStars.forEach((s) => (s.className = "far fa-star"))
        }
      })
    })
  }

  // Color Options
  const colorOptions = document.querySelectorAll(".color-option")

  if (colorOptions.length > 0) {
    colorOptions.forEach((option) => {
      option.addEventListener("click", function () {
        // Remove active class from all options
        colorOptions.forEach((opt) => opt.classList.remove("active"))

        // Add active class to clicked option
        this.classList.add("active")
      })
    })
  }

  // Price Range Slider
  const priceRange = document.getElementById("price-range")
  const priceValue = document.getElementById("price-value")

  if (priceRange && priceValue) {
    priceRange.addEventListener("input", function () {
      priceValue.textContent = "$" + this.value
    })
  }

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll(".faq-question")

  if (faqQuestions.length > 0) {
    faqQuestions.forEach((question) => {
      question.addEventListener("click", function () {
        const faqItem = this.parentElement
        faqItem.classList.toggle("active")

        // Toggle icon
        const icon = this.querySelector(".faq-toggle i")
        if (faqItem.classList.contains("active")) {
          icon.className = "fas fa-minus"
        } else {
          icon.className = "fas fa-plus"
        }
      })
    })
  }

  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll(".testimonial-slide")
  const testimonialDots = document.querySelectorAll(".dot")
  const prevButton = document.querySelector(".testimonial-prev")
  const nextButton = document.querySelector(".testimonial-next")

  if (testimonialSlides.length > 0) {
    let currentSlide = 0

    // Show slide
    function showSlide(index) {
      // Hide all slides
      testimonialSlides.forEach((slide) => slide.classList.remove("active"))
      testimonialDots.forEach((dot) => dot.classList.remove("active"))

      // Show selected slide
      testimonialSlides[index].classList.add("active")
      testimonialDots[index].classList.add("active")

      currentSlide = index
    }

    // Next slide
    function nextSlide() {
      currentSlide = (currentSlide + 1) % testimonialSlides.length
      showSlide(currentSlide)
    }

    // Previous slide
    function prevSlide() {
      currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length
      showSlide(currentSlide)
    }

    // Event listeners
    if (nextButton) {
      nextButton.addEventListener("click", nextSlide)
    }

    if (prevButton) {
      prevButton.addEventListener("click", prevSlide)
    }

    // Dot navigation
    testimonialDots.forEach((dot) => {
      dot.addEventListener("click", function () {
        const slideIndex = Number.parseInt(this.getAttribute("data-slide"))
        showSlide(slideIndex)
      })
    })

    // Auto slide
    setInterval(nextSlide, 5000)
  }

  // Add to Cart Animation
  const addToCartButtons = document.querySelectorAll(".add-to-cart, .add-to-cart-detail")

  if (addToCartButtons.length > 0) {
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        // Prevent link navigation when clicking the button
        e.preventDefault()
        e.stopPropagation()

        // Update cart count
        const cartCount = document.querySelector(".cart-count")
        if (cartCount) {
          let count = Number.parseInt(cartCount.textContent)
          count++
          cartCount.textContent = count
        }

        // Add animation class
        button.classList.add("added")

        // Change text temporarily
        const originalText = button.textContent
        button.textContent = "Added!"

        // Reset after animation
        setTimeout(() => {
          button.classList.remove("added")
          button.textContent = originalText
        }, 1500)
      })
    })
  }

  // Form Validation
  const forms = document.querySelectorAll("form")

  if (forms.length > 0) {
    forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault()

        // Simple validation
        let valid = true
        const requiredFields = form.querySelectorAll("[required]")

        requiredFields.forEach((field) => {
          if (!field.value.trim()) {
            valid = false
            field.classList.add("error")
          } else {
            field.classList.remove("error")
          }
        })

        if (valid) {
          // Show success message or redirect
          alert("Form submitted successfully!")
          form.reset()
        } else {
          alert("Please fill in all required fields.")
        }
      })
    })
  }
})
