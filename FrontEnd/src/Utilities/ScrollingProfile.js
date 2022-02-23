const scrollingProfile = (Theme) => {
  let leftSectionElement = document.getElementById("leftSectionProfile");
  const positionBottom =
    window.scrollY + leftSectionElement.getBoundingClientRect().bottom;
  document.addEventListener("scroll", () => {
    if (window.innerWidth >= Theme.breakpoints.values.lg) {
      if (window.scrollY + window.innerHeight >= positionBottom) {
        leftSectionElement.style.position = "fixed";
        leftSectionElement.style.bottom = 0;
      } else {
        leftSectionElement.style.position = "relative";
      }
    }
  });
};
export default scrollingProfile;
