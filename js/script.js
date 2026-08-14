document.querySelectorAll(".count-text").forEach((counter) => {
  const speed = parseInt(counter.getAttribute("data-speed"));
  const stop = parseInt(counter.getAttribute("data-stop"));
  let count = 0;
  const increment = stop / (speed / 50); // update every 50ms

  const updateCounter = () => {
    if (count < stop) {
      count += increment;
      counter.innerText = Math.floor(count);
      setTimeout(updateCounter, 50);
    } else {
      counter.innerText = stop;
    }
  };

  updateCounter();
});

// 2 toggle burger
document.addEventListener("DOMContentLoaded", () => {
  const mobileBreakpoint = 992;

  // Select ALL <a> tags that are direct children of any li.dropdown within the navigation.
  // This targets both top-level and nested dropdown links.
  const dropdownLinks = document.querySelectorAll(
    ".navigation li.dropdown > a"
  );

  const handleDropdownClick = (e) => {
    // 1. Check if we are in the mobile view
    if (window.innerWidth > mobileBreakpoint) {
      return; // Exit if it's desktop size
    }

    // Prevent the link from navigating
    e.preventDefault();

    const clickedLink = e.currentTarget;
    const parentLi = clickedLink.closest("li.dropdown");
    // Get the direct next sibling <ul> menu
    const subMenu = clickedLink.nextElementSibling;

    // Ensure the element is a UL and not the .dropdown-btn
    if (subMenu && subMenu.tagName === "UL") {
      // --- Logic to close sibling menus at the SAME level ---
      // Find the immediate parent <ul> of the current dropdown <li>
      const currentUl = parentLi.parentNode;

      // Iterate over all dropdown <li> items in the current <ul>
      currentUl.querySelectorAll(":scope > li.dropdown").forEach((li) => {
        // Check if this <li> is NOT the one that was just clicked
        if (li !== parentLi) {
          const siblingMenu = li.querySelector(":scope > ul");
          if (siblingMenu && siblingMenu.style.display === "initial") {
            // Close the sibling menu
            siblingMenu.style.display = "none";
            li.classList.remove("active");
          }
        }
      });
      // ----------------------------------------

      // 2. Toggle the display style of the clicked subMenu
      if (subMenu.style.display === "initial") {
        subMenu.style.display = "none";
        parentLi.classList.remove("active");
      } else {
        subMenu.style.display = "initial";
        parentLi.classList.add("active");
      }
    }
  };

  // Attach the click handler to ALL dropdown links
  dropdownLinks.forEach((link) => {
    link.addEventListener("click", handleDropdownClick);
  });

  // Handle resizing back to desktop (optional: clear inline styles)
  window.addEventListener("resize", () => {
    if (window.innerWidth > mobileBreakpoint) {
      // Clear all inline styles that JS added to ALL sub-menus
      document.querySelectorAll(".navigation li.dropdown ul").forEach((ul) => {
        ul.style.display = "";
      });
      // Remove 'active' class from all dropdowns
      document.querySelectorAll(".navigation li.dropdown").forEach((li) => {
        li.classList.remove("active");
      });
    }
  });
});
// Get the header element
document.addEventListener("DOMContentLoaded", () => {
  const scrollTriggerPoint = 100;
  const header = document.querySelector(".main-header"); // ✅ Get the header element

  function handleScroll() {
    if (window.scrollY > scrollTriggerPoint) {
      header.classList.add("fixed-header");
    } else {
      header.classList.remove("fixed-header");
    }
  }

  window.addEventListener("scroll", handleScroll);
});





window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".preloader").style.display = "none";
    document.querySelector(".preloader").style.transition = ".3s";
  }, 900); // 2000ms = 2 seconds
});

// box
// ................
// // box
document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".box");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fadeInUp");
        // Optional: Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  });

  boxes.forEach((box) => observer.observe(box));
});
// box1 right
document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".box1");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fadeInRight");
        // Optional: Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  });

  boxes.forEach((box) => observer.observe(box));
});
// box2 left
document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".box2");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fadeInLeft");
        // Optional: Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  });

  boxes.forEach((box) => observer.observe(box));
});
// fadeIn
document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".pati-my");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fadeIn");
        // Optional: Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  });

  boxes.forEach((box) => observer.observe(box));
});

//         <?php

// // Check if form data was actually submitted
// if ($_SERVER["REQUEST_METHOD"] == "POST") {

//     // --- YOUR EMAIL SENDING LOGIC ---

//     // Your email
//     $to = "muqadescodes212@gmail.com";
//     $name = $_POST['name'];
//     $email = $_POST['email'];
//     $message = $_POST['message'];
//     $phone_number = $_POST['phone_number'];
//     $subject = $_POST['subject'];
//     $message = $_POST['message'];
//     $subject = "Portfolio Contact Form Message";

//     // ... (rest of your headers and body construction) ...

//     $headers = "MIME-Version: 1.0\r\n";
//     $headers .= "Content-type:text/html;charset=UTF-8\r\n";
//     $headers .= "From: goodjm@muqadescodes.com\r\n"; 

//     // Try sending email
//     if (mail($to, $subject, $body, $headers)) {
//         // SUCCESS: Redirect back to the form page with a 'status=success' query parameter
//         // IMPORTANT: Replace 'contact.php' with the actual name of the page holding your form!
//         header("Location: index.php?status=success");
//         exit; // Always call exit after header redirection
//     } else {
//         // FAILURE: Redirect back to the form page with a 'status=error' query parameter
//         header("Location: index.php?status=error");
//         exit; // Always call exit after header redirection
//     }
// } else {
//     // If someone tries to access this script directly without submitting the form
//     header("Location: index.php");
//     exit;
// }
// ?>