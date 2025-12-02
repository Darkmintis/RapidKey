// Simple avatar utility to replace Discord avatar functionality
// Creates basic avatar elements without Discord integration

type AvatarOptions = {
  userIcon?: string;
  size?: number;
};

type AvatarData = {
  discordId?: string;
  discordAvatar?: string;
  uid?: string;
  name?: string;
};

export function getAvatarElement(
  data: AvatarData,
  options: AvatarOptions = {}
): HTMLElement {
  const { userIcon = "fas fa-fw fa-user", size = 32 } = options;
  
  // Create a simple avatar element
  const avatarDiv = document.createElement("div");
  avatarDiv.className = "avatar";
  avatarDiv.style.width = `${size}px`;
  avatarDiv.style.height = `${size}px`;
  avatarDiv.style.borderRadius = "50%";
  avatarDiv.style.backgroundColor = "var(--sub-color)";
  avatarDiv.style.display = "flex";
  avatarDiv.style.alignItems = "center";
  avatarDiv.style.justifyContent = "center";
  avatarDiv.style.color = "var(--main-color)";
  
  // Create icon element
  const icon = document.createElement("i");
  icon.className = userIcon;
  icon.style.fontSize = `${Math.floor(size * 0.5)}px`;
  
  avatarDiv.appendChild(icon);
  return avatarDiv;
}
