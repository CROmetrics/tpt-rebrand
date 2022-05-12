const v2SearchFiltersHTML = /*html*/ `
  <div class="${TAG}-new-inputs-holder ${TAG}-grade-holder">
    <div class="${TAG}-new-inputs-divider"></div>
    <input class="${TAG}-new-inputs-grade" type="search" autocomplete="off" aria-label="Grade" aria-owns="grade-dropdown" placeholder="Grade"/>
    <div id="grade-dropdown" class="${TAG}-new-inputs-dropdown ${TAG}-new-inputs-grade-dropdown">
      <div class="${TAG}-new-inputs-dropdown-title">Grade</div>
      <div class="${TAG}-new-inputs-grade-dropdown-holder">
        <label search-value="Pre-K">
          <input class="${TAG}-new-inputs-grade-dropdown-pre-k" type="checkbox"/>
          <span>PreK</span>
        </label>
        <label search-value="Kindergarten">
          <input class="${TAG}-new-inputs-grade-dropdown-k" type="checkbox"/>
          <span>K</span>
        </label>
        <label search-value="First">
          <input class="${TAG}-new-inputs-grade-dropdown-1st" type="checkbox"/>
          <span>1st</span>
        </label>
        <label search-value="Second">
          <input class="${TAG}-new-inputs-grade-dropdown-2nd" type="checkbox"/>
          <span>2nd</span>
        </label>
        <label search-value="Third">
          <input class="${TAG}-new-inputs-grade-dropdown-3rd" type="checkbox"/>
          <span>3rd</span>
        </label>
        <label search-value="Fourth">
          <input class="${TAG}-new-inputs-grade-dropdown-4th" type="checkbox"/>
          <span>4th</span>
        </label>
        <label search-value="Fifth">
          <input class="${TAG}-new-inputs-grade-dropdown-5th" type="checkbox"/>
          <span>5th</span>
        </label>
      </div>
      <div class="${TAG}-new-inputs-grade-dropdown-holder">
        <label search-value="Sixth">
          <input class="${TAG}-new-inputs-grade-dropdown-6th" type="checkbox"/>
          <span>6th</span>
        </label>
        <label search-value="Seventh">
          <input class="${TAG}-new-inputs-grade-dropdown-7th" type="checkbox"/>
          <span>7th</span>
        </label>
        <label search-value="Eighth">
          <input class="${TAG}-new-inputs-grade-dropdown-8th" type="checkbox"/>
          <span>8th</span>
        </label>
        <label search-value="Ninth">
          <input class="${TAG}-new-inputs-grade-dropdown-9th" type="checkbox"/>
          <span>9th</span>
        </label>
        <label search-value="Tenth">
          <input class="${TAG}-new-inputs-grade-dropdown-10th" type="checkbox"/>
          <span>10th</span>
        </label>
        <label search-value="Eleventh">
          <input class="${TAG}-new-inputs-grade-dropdown-11th" type="checkbox"/>
          <span>11th</span>
        </label>
        <label search-value="Twelfth">
          <input class="${TAG}-new-inputs-grade-dropdown-12th" type="checkbox"/>
          <span>12th</span>
        </label>
      </div>
    </div>
  </div>
  <div class="${TAG}-new-inputs-holder ${TAG}-subject-holder">
    <div class="${TAG}-new-inputs-divider"></div>
    <input class="${TAG}-new-inputs-subject" type="search" autocomplete="off" aria-label="Subject" aria-owns="subject-dropdown" placeholder="Subject"/>
    <div id="subject-dropdown" class="${TAG}-new-inputs-dropdown ${TAG}-new-inputs-subject-dropdown">
      <div class="${TAG}-new-inputs-dropdown-title">Subject</div>
      <label search-value="Arts">
        <input class="${TAG}-new-inputs-subject-dropdown-arts-and-music" type="checkbox"/>
        <span>Arts & Music</span>
      </label>
      <label search-value="English-Language-Arts">
        <input class="${TAG}-new-inputs-subject-dropdown-english-language-arts" type="checkbox"/>
        <span>English Language Arts</span>
      </label>
      <label search-value="World-Language">
        <input class="${TAG}-new-inputs-subject-dropdown-foreign-language" type="checkbox"/>
        <span>Foreign Language</span>
      </label>
      <label search-value="HolidaysSeasonal">
        <input class="${TAG}-new-inputs-subject-dropdown-holiday-and-seasonal" type="checkbox"/>
        <span>Holiday / Seasonal</span>
      </label>
      <label search-value="Math">
        <input class="${TAG}-new-inputs-subject-dropdown-math" type="checkbox"/>
        <span>Math</span>
      </label>
      <label search-value="Science">
        <input class="${TAG}-new-inputs-subject-dropdown-science" type="checkbox"/>
        <span>Science</span>
      </label>
      <label search-value="Social-Studies-History">
        <input class="${TAG}-new-inputs-subject-dropdown-social-studies-and-history" type="checkbox"/>
        <span>Social Studies + History</span>
      </label>
      <label search-value="Specialty">
        <input class="${TAG}-new-inputs-subject-dropdown-specialty" type="checkbox"/>
        <span>Specialty</span>
      </label>
    </div>
  </div>
  <div class="${TAG}-new-inputs-holder ${TAG}-price-holder">
    <div class="${TAG}-new-inputs-divider"></div>
    <input class="${TAG}-new-inputs-price" type="search" autocomplete="off" aria-label="Price" aria-owns="price-dropdown" placeholder="Price"/>
    <div id="price-dropdown" class="${TAG}-new-inputs-dropdown ${TAG}-new-inputs-price-dropdown">
      <div class="${TAG}-new-inputs-dropdown-title">Price</div>
      <label search-value="Free">
        <input class="${TAG}-new-inputs-price-dropdown-free" type="checkbox"/>
        <span>Free</span>
      </label>
      <label search-value="Under-5">
        <input class="${TAG}-new-inputs-price-dropdown-under-5" type="checkbox"/>
        <span>Under $5</span>
      </label>
      <label search-value="5-to-10">
        <input class="${TAG}-new-inputs-price-dropdown-5-10" type="checkbox"/>
        <span>$5 - $10</span>
      </label>
      <label search-value="Above-10">
        <input class="${TAG}-new-inputs-price-dropdown-10-and-up" type="checkbox"/>
        <span>$10 and up</span>
      </label>
      <label search-value="On-Sale">
        <input class="${TAG}-new-inputs-price-dropdown-on-sale" type="checkbox"/>
        <span>On Sale</span>
      </label>
    </div>
  </div>
`;

export default v2SearchFiltersHTML;
