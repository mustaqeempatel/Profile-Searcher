let selectedPlatform = "";

function selectPlatform(platform) {
  selectedPlatform = platform;
  document.getElementById("platforms").style.display = "none";
  document.getElementById("searchSection").style.display = "block";
  document.getElementById("mainTitle").style.display = "none";
  document.getElementById("platformTitle").textContent =
    "Search " +
    platform.charAt(0).toUpperCase() +
    platform.slice(1) +
    " Profile";
}

function goBack() {
  document.getElementById("searchSection").style.display = "none";
  document.getElementById("platforms").style.display = "grid";
  document.getElementById("profileCard").style.display = "none";
  document.getElementById("error").style.display = "none";
  document.getElementById("mainTitle").style.display = "block";
}

async function getProfile() {
  const username = document.getElementById("username").value.trim();
  const errorText = document.getElementById("error");
  const profileCard = document.getElementById("profileCard");

  if (!username) {
    errorText.textContent = "Please enter a username!";
    errorText.style.display = "block";
    profileCard.style.display = "none";
    return;
  }

  if (selectedPlatform === "github") {
    const url = `https://api.github.com/users/${username}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("User not found");
      const data = await res.json();

      document.getElementById("avatar").src = data.avatar_url;
      document.getElementById("name").textContent =
        data.name || "No name available";
      document.getElementById("login").textContent = "@" + data.login;
      document.getElementById("bio").textContent =
        data.bio || "No bio available";
      document.getElementById("followers").textContent = data.followers;
      document.getElementById("following").textContent = data.following;
      document.getElementById("repos").textContent = data.public_repos;

      document.getElementById("checkProfile").onclick = () => {
        window.open(data.html_url, "_blank");
      };

      errorText.style.display = "none";
      profileCard.style.display = "block";
    } catch (err) {
      profileCard.style.display = "none";
      errorText.textContent = "User not found! Please try again.";
      errorText.style.display = "block";
    }
  } else {
    const urls = {
      linkedin: `https://www.linkedin.com/in/${username}`,
      twitter: `https://twitter.com/${username}`,
      instagram: `https://instagram.com/${username}`,
      snapchat: `https://www.snapchat.com/add/${username}`,
      youtube: `https://www.youtube.com/@${username}`,
      facebook: `https://www.facebook.com/${username}`,
      threads: `https://www.threads.net/@${username}`,
      telegram: `https://t.me/${username}`,
    };

    const finalUrl = urls[selectedPlatform];
    if (finalUrl) {
      window.open(finalUrl, "_blank");
    } else {
      errorText.textContent = "Unsupported platform!";
      errorText.style.display = "block";
    }
  }
}
