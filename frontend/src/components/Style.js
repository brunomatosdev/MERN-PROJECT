import styled from "styled-components";

// Background
import background from "./../assets/greenBG.jpeg";

export const colors = {
  primary: "#fff",
  theme: "#BE185D",
  light1: "#F3F4F6",
  light2: "#E5E7EB",
  dark1: "#1F2937",
  dark2: "#4B5563",
  dark3: "#9CA3AF", // Fixed typo here
  red: "#DC2626",
};

// Styled Components
export const StyledContainer = styled.div`
  margin: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${background});
  background-size: cover;
  background-attachment: fixed;

  /* Add styles for the text */
  p {
    font-size: 48px; /* Adjust the size as needed */
    color: #be185d; /* Change the color to your desired color */
  }
`;
