const newHeaderHTML = /*html*/ `
  <div class="${TAG}-wrapper">
      <div class="${TAG}-header">
          <div class="${TAG}-header-nav">
              <div class="${TAG}-header-nav-left">
                  <a href="/">
                      <img alt="Teachers Pay Teachers" src="https://static1.teacherspayteachers.com/tpt-frontend/releases/production/current/logo.arduooz1ai.svg"/>
                  </a>
                  <div class="${TAG}-header-nav-left-catalog">
                      <button>Catalog</button>
                      <div class="${TAG}-header-nav-left-catalog-dropdown">
                          <div class="${TAG}-header-nav-left-catalog-dropdown-column">
                              <div class="${TAG}-header-nav-left-catalog-dropdown-column-header">Grades</div>
                              <ul>
                                  <li>
                                      <a href="/Browse/Grade-Level/Pre-K,Kindergarten">Pre K - K</a>
                                  </li>
                                  <li>
                                      <a href="/Browse/Grade-Level/First,Second">1 - 2</a>
                                  </li>
                                  <li>
                                      <a href="/Browse/Grade-Level/Third,Fourth,Fifth">3 - 5</a>
                                  </li>
                                  <li>
                                      <a href="/Browse/Grade-Level/Sixth,Seventh,Eighth">6 - 8</a>
                                  </li>
                                  <li>
                                      <a href="/Browse/Grade-Level/Ninth,Tenth,Eleventh,Twelfth">9 - 12</a>
                                  </li>
                              </ul>
                          </div>
                          <div class="${TAG}-header-nav-left-catalog-dropdown-column">
                              <div class="${TAG}-header-nav-left-catalog-dropdown-column-header">Subject</div>
                              <ul>
                                  <li>
                                      <a href="/Browse/PreK-12-Subject-Area/Arts">Art & Music</a>
                                  </li>
                                  <li>
                                      <a href="/Browse/PreK-12-Subject-Area/English-Language-Arts">English Language Arts</a>
                                  </li>
                                  <li>
                                      <a href="/Browse/PreK-12-Subject-Area/World-Language">Foreign Language</a>
                                  </li>
                                  <li>
                                      <a href="/Browse/PreK-12-Subject-Area/HolidaysSeasonal">Holiday / Seasonal</a>
                                  </li>
                                  <li>
                                      <a href="/Browse/PreK-12-Subject-Area/Math">Math</a>
                                  </li>
                                  <li>
                                      <a href="/Browse/PreK-12-Subject-Area/Science">Science</a>
                                  </li>
                                  <li>
                                      <a href="/Browse/PreK-12-Subject-Area/Social-Studies-History">Social Studies + History</a>
                                  </li>
                                  <li>
                                      <a href="/Browse/PreK-12-Subject-Area/Specialty">Specialty</a>
                                  </li>
                                  <li>
                                      <a href="/Browse/PreK-12-Subject-Area/For-All-Subject-Areas">For all subject areas</a>
                                  </li>
                              </ul>
                          </div>
                          <div class="${TAG}-header-nav-left-catalog-dropdown-column">
                              <div class="${TAG}-header-nav-left-catalog-dropdown-column-header">Price</div>
                              <ul>
                                  <li>
                                      <a href="/Browse/Price-Range/Free">Free</a>
                                  </li>
                                  <li>
                                      <a href="/Browse/Price-Range/Under-5">Under $5</a>
                                  </li>
                                  <li>
                                      <a href="/Browse/Price-Range/5-to-10">$5 - $10</a>
                                  </li>
                                  <li>
                                      <a href="/Browse/Price-Range/Above-10">$10 and up</a>
                                  </li>
                                  <li>
                                      <a href="/Browse/Price-Range/On-Sale">On Sale</a>
                                  </li>
                              </ul>
                          </div>
                          <div class="${TAG}-header-nav-left-catalog-dropdown-column">
                              <div class="${TAG}-header-nav-left-catalog-dropdown-column-header">Resource Type</div>
                              <ul>
                                  <li>
                                      <a href="/Browse/Type-of-Resource/Independent-Work-Packet">Independent Work Packet</a>
                                  </li>
                                  <li>
                                      <a href="/Browse/Type-of-Resource/Worksheets">Worksheets</a>
                                  </li>
                                  <li>
                                      <a href="/Browse/Type-of-Resource/Lesson-Plans-Individual">Lesson Plans</a>
                                  </li>
                                  <li>
                                      <a href="/Browse/Type-of-Resource/Printables">Printable</a>
                                  </li>
                                  <li>
                                      <a href="/Browse/Type-of-Resource/Activities">Activities</a>
                                  </li>
                                  <li>
                                      <a href="/Browse/Type-of-Resource/Assessment">Assessment</a>
                                  </li>
                                  <li>
                                      <a href="/Browse/Type-of-Resource/Math-Centers">Math Centers</a>
                                  </li>
                                  <li>
                                      <a href="/Browse/Type-of-Resource/Literacy-Center-Ideas">Literacy Center Ideas</a>
                                  </li>
                                  <li>
                                      <a href="/Browse/Type-of-Resource/Projects">Projects</a>
                                  </li>
                              </ul>
                          </div>
                          <div class="${TAG}-header-nav-left-catalog-dropdown-column">
                              <div class="${TAG}-header-nav-left-catalog-dropdown-column-header">Formats</div>
                              <ul>
                                  <li>
                                      <a href="/Browse/Format/All-Easel">Easel by TPT</a>
                                  </li>
                                  <li>
                                      <a href="/Browse/Format/All-Google">Google Apps</a>
                                  </li>
                                  <li>
                                      <a href="/Browse/Format/PDF">PDF</a>
                                  </li>
                                  <li>
                                      <a href="/Browse/Format/All-Microsoft">Microsoft</a>
                                  </li>
                                  <li>
                                      <a href="/Browse/Format/Images">Image</a>
                                  </li>
                                  <li>
                                      <a href="/Browse/Format/All-Interactive-Whiteboards">Interactive Whiteboards</a>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </div>
                  <div class="${TAG}-header-nav-left-easel">
                      <button>Easel by TPT</button>
                      <div class="${TAG}-header-nav-left-easel-dropdown">
                          <div class="${TAG}-header-nav-left-easel-dropdown-intro">
                              <div class="${TAG}-header-nav-left-easel-dropdown-intro-header">Easel by TPT</div>
                              <div class="${TAG}-header-nav-left-easel-dropdown-intro-content">Interactive resources you can assign in your digital classroom from TPT.</div>
                              <a target="_blank" href="/easel/learn-more" class="${TAG}-header-nav-left-easel-dropdown-intro-button">Learn About Easel</a>
                          </div>
                          <div class="${TAG}-header-nav-left-easel-dropdown-activities">
                              <a href="/Browse/Format/Easel-Activity">
                                  <img alt="Easel activitie on a laptop" src="//cdn.optimizely.com/img/11000223989/7152d586c5714672a3b63214e289894e.png"/>
                              </a>
                              <a href="/Browse/Format/Easel-Activity">Easel Activities</a>
                              <p>Pre-made digital activities. Add highlights, virtual manipulatives, and more.</p>
                              <a href="/Browse/Format/Easel-Activity">
                                  <span>Browse Easel Activities</span>
                                  <svg width="27" height="16" viewBox="0 0 27 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M26.7071 8.70711C27.0976 8.31658 27.0976 7.68342 26.7071 7.29289L20.3431 0.928932C19.9526 0.538408 19.3195 0.538408 18.9289 0.928932C18.5384 1.31946 18.5384 1.95262 18.9289 2.34315L24.5858 8L18.9289 13.6569C18.5384 14.0474 18.5384 14.6805 18.9289 15.0711C19.3195 15.4616 19.9526 15.4616 20.3431 15.0711L26.7071 8.70711ZM0 9H26V7H0V9Z" fill="#3B81FD"/>
                                  </svg>
                              </a>
                          </div>
                          <div class="${TAG}-header-nav-left-easel-dropdown-assessments">
                              <a href="/Browse/Format/Easel-Assessment">
                                  <img alt="Easel assessment on a laptop" src="//cdn.optimizely.com/img/11000223989/9191c2851da44072985ca6f3d93a3ce7.png"/>
                              </a>
                              <a href="/Browse/Format/Easel-Assessment">Easel Assessments</a>
                              <p>Self-grading quizzes and check-ins to quickly capture insights about student performance.</p>
                              <a href="/Browse/Format/Easel-Assessment">
                                  <span>Browse Easel Assessments</span>
                                  <svg width="27" height="16" viewBox="0 0 27 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M26.7071 8.70711C27.0976 8.31658 27.0976 7.68342 26.7071 7.29289L20.3431 0.928932C19.9526 0.538408 19.3195 0.538408 18.9289 0.928932C18.5384 1.31946 18.5384 1.95262 18.9289 2.34315L24.5858 8L18.9289 13.6569C18.5384 14.0474 18.5384 14.6805 18.9289 15.0711C19.3195 15.4616 19.9526 15.4616 20.3431 15.0711L26.7071 8.70711ZM0 9H26V7H0V9Z" fill="#3B81FD"/>
                                  </svg>
                              </a>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="${TAG}-header-nav-right">
                  <div class="${TAG}-header-nav-right-tptsa">
                      <a target="_blank" href="/TpTSchoolAccess/Teachers">TPT School Access</a>
                      <div class="${TAG}-header-nav-right-tptsa-dropdown">
                          <div class="${TAG}-header-nav-right-tptsa-dropdown-title">TPT SCHOOL ACCESS</div>
                          <div class="${TAG}-header-nav-right-tptsa-dropdown-content">Unlock access to 4 million<br/>resources—at no cost to you—with a school-funded subscription.</div>
                          <a target="_blank" href="/TpTSchoolAccess/Teachers">Refer Your Principal</a>
                      </div>
                  </div>
                  <div class="${TAG}-header-nav-right-log-in-or-join">
                      <a href="/Login">Log In</a>
                      <span class="${TAG}-header-nav-right-log-in-or-join-divider">|</span>
                      <a href="/Signup">Join</a>
                  </div>
                  <div class="${TAG}-header-nav-right-cart">
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="25" viewBox="0 0 26 25" fill="none">
                          <path d="M0 1H4.78668L8.02107 17.1351H21.9929" stroke="#222222" stroke-width="2" fill="transparent"/>
                          <ellipse cx="9.70209" cy="22.0251" rx="2.88666" ry="2.97533" fill="#222222"/>
                          <ellipse cx="19.1064" cy="22.0251" rx="2.88666" ry="2.97533" fill="#222222"/>
                          <path d="M7.0514 13.5485H20.929L23.9998 3.99219H5.2207" stroke="black" stroke-width="2" fill="transparent"/>
                      </svg>
                      <div class="${TAG}-header-nav-right-cart-count"></div>
                  </div>
                  <div class="${TAG}-header-nav-right-seller">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M2.59365 0H21.3982L23.9512 7.56071L23.9628 7.64199C24.0027 7.92053 24.01 8.19819 23.9872 8.47009V23.9999H0.0487242V8.67133C0.0168489 8.45631 0 8.22881 0 7.98851V7.8445L2.59365 0ZM1.77546 8.16456V8.52193C1.88164 9.05678 2.14696 9.36755 2.42718 9.56581C2.83759 9.85619 3.35932 9.95361 3.69812 9.94495L3.70895 9.94467H3.71979C4.66012 9.94467 5.11936 9.39833 5.39076 8.78279C5.52916 8.4689 5.60106 8.16467 5.63783 7.9696C5.64686 7.9217 5.65371 7.88081 5.65908 7.84739L5.66164 7.83124C5.6655 7.80673 5.67161 7.76794 5.67582 7.74531C5.67743 7.73664 5.68226 7.71077 5.69012 7.67984C5.69367 7.66585 5.70265 7.63147 5.71813 7.58936C5.72587 7.56831 5.74041 7.53103 5.76329 7.48684C5.78104 7.45256 5.83109 7.35951 5.92554 7.26603C6.0158 7.1767 6.26743 6.97371 6.6425 7.025C6.99797 7.07361 7.18339 7.31526 7.24039 7.40008C7.30702 7.49924 7.3375 7.58896 7.34871 7.62389C7.36281 7.66782 7.37069 7.70416 7.37483 7.72517C7.38778 7.79099 7.39053 7.84678 7.39095 7.85534C7.39308 7.89461 7.39304 7.94956 7.393 7.9789L7.39299 7.98851C7.39299 9.06887 8.25311 9.94467 9.31412 9.94467C10.1279 9.94467 10.5992 9.39909 10.9117 8.69169C11.0625 8.3503 11.1477 8.0265 11.1981 7.82088L11.2092 7.77485L11.2093 7.7748C11.2176 7.74054 11.2263 7.70465 11.2329 7.67866C11.238 7.65872 11.2462 7.62729 11.2563 7.59462C11.2613 7.57841 11.2702 7.55096 11.2829 7.51891L11.2829 7.51891C11.2911 7.49809 11.3215 7.42099 11.3794 7.33652C11.4073 7.2958 11.475 7.20296 11.5914 7.11933C11.7174 7.02883 11.9585 6.91213 12.2644 6.97616C12.552 7.03635 12.7167 7.22014 12.7858 7.31514C12.8569 7.41293 12.8915 7.50325 12.9061 7.54494C12.9364 7.63135 12.9467 7.70403 12.9498 7.72616C12.9543 7.75859 12.9565 7.78629 12.9577 7.8038C12.9618 7.86381 12.962 7.9355 12.962 7.98851C12.962 8.39637 13.0956 8.92142 13.4178 9.32613C13.7136 9.69781 14.2186 10.0346 15.1257 10.0346C15.9615 10.0346 16.4105 9.44879 16.6819 8.67087C16.811 8.30104 16.8692 7.95871 16.8945 7.77618C16.9003 7.73414 16.9043 7.70135 16.9075 7.67485L16.9082 7.66919L16.9085 7.66702L16.9085 7.66694C16.9097 7.65715 16.9124 7.63483 16.9153 7.61536C16.9163 7.60881 16.9181 7.59663 16.9209 7.58182C16.9225 7.57285 16.9298 7.5333 16.9439 7.48611L16.9439 7.48607C16.9493 7.4681 16.9706 7.39659 17.0152 7.31485C17.043 7.26738 17.1305 7.15088 17.1943 7.08635C17.3172 6.99297 17.6716 6.86796 17.8957 6.87154C18.096 6.92717 18.3778 7.11668 18.464 7.21803C18.507 7.28297 18.5641 7.39553 18.5816 7.44063C18.6101 7.52022 18.6204 7.58608 18.6232 7.60377C18.6304 7.64992 18.6324 7.68746 18.6328 7.69655C18.6336 7.71123 18.6339 7.72392 18.6341 7.73065C18.6342 7.73766 18.6343 7.74437 18.6343 7.75022C18.6343 7.75577 18.6343 7.76055 18.6343 7.7641L18.6339 7.81715C18.6335 7.85624 18.6329 7.9121 18.6329 7.98851C18.6329 8.41146 18.7829 8.9173 19.0949 9.30225C19.3862 9.66153 19.8389 9.94467 20.5488 9.94467C21.4695 9.94467 22.1572 9.25635 22.2604 8.39693V8.16071L20.0916 1.82659H3.97537L1.77546 8.16456ZM3.73033 11.7029C3.2035 11.7145 2.46469 11.5992 1.77546 11.2187V22.2417H12.2411V13.2856H19.8564V22.2417H22.2604V11.252C21.7679 11.5371 21.1893 11.7029 20.5488 11.7029C19.3118 11.7029 18.3749 11.176 17.7632 10.4215L17.7418 10.3948C17.2323 11.1333 16.4138 11.7928 15.1257 11.7928C13.7259 11.7928 12.7173 11.2384 12.0763 10.4332C12.0425 10.3907 12.0099 10.3478 11.9784 10.3044C11.4496 11.0319 10.6097 11.7029 9.31412 11.7029C8.17305 11.7029 7.15435 11.1694 6.48544 10.3341C5.94671 11.0583 5.07995 11.6996 3.73033 11.7029ZM13.9679 22.2075V15.0439H18.1297V22.2075H13.9679Z" fill="#222222"/>
                          <rect x="4.18823" y="14.165" width="5.41758" height="3.53749" stroke="#222222" stroke-width="2" fill="transparent"/>
                      </svg>
                      <div class="${TAG}-header-nav-right-seller-dropdown">
                          <div class="${TAG}-header-nav-right-seller-dropdown-default">
                              <ul>
                                  <li class="${TAG}-header-nav-right-seller-dropdown-focused">My Store</li>
                                  <li>
                                      <a href="/Dashboard">Dashboard</a>
                                  </li>
                                  <li>
                                      <a href="/My-Sales">Sales Reports</a>
                                  </li>
                                  <li>
                                      <a href="/My-Products">Product Listings</a>
                                  </li>
                                  <li>
                                      <a href="https://easel.teacherspayteachers.com/listings/assessments">Easel Listings</a>
                                      <div class="${TAG}-header-nav-right-seller-dropdown-new">NEW</div>
                                  </li>
                                  <li>
                                      <a href="/My-Statistics">My Product Statistics</a>
                                  </li>
                                  <li>
                                      <a class="${TAG}-header-nav-right-seller-dropdown-store">My Store</a>
                                  </li>
                              </ul>
                              <ul>
                                  <li class="${TAG}-header-nav-right-seller-dropdown-focused">Grow your store</li>
                                  <li>
                                      <a href="/Throw-a-Sale">Throw a Sale</a>
                                  </li>
                                  <li>
                                      <a href="/My-Sponsored">Promote on TPT</a>
                                  </li>
                                  <li>
                                      <a href="/Newsletter-Promotion-Product">Newsletter</a>
                                  </li>
                                  <li>
                                      <a href="/My-Account/Facebook-Pixel">Facebook Pixel</a>
                                  </li>
                                  <li>
                                      <a href="/My-Account/Virtual-Assistants">Manage my VAs</a>
                                      <div class="${TAG}-header-nav-right-seller-dropdown-new ${TAG}-header-nav-right-seller-dropdown-new-2">NEW</div>
                                  </li>
                              </ul>
                              <ul>
                                  <li class="${TAG}-header-nav-right-seller-dropdown-focused">Communicate</li>
                                  <li>
                                      <a href="/Note-To-Followers">New note to followers</a>
                                  </li>
                                  <li>
                                      <a class="${TAG}-header-nav-right-seller-dropdown-store-q-and-a">Store Q&A</a>
                                  </li>
                                  <li>
                                      <a class="${TAG}-header-nav-right-seller-dropdown-store-comments">Comments</a>
                                  </li>
                                  <li>
                                      <a href="/forum/">Seller's Forum</a>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </div>
                  <div class="${TAG}-header-nav-right-user">
                      <div class="${TAG}-header-nav-right-user-bubble ${TAG}-hidden"></div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12Z" stroke="#222222" stroke-width="2" fill="transparent"/>
                          <ellipse cx="11.9996" cy="9.01525" rx="3.86388" ry="3.86388" fill="#222222"/>
                          <path d="M12.0001 12.8799C8.91772 12.8799 6.41895 15.3787 6.41895 18.461H17.5813C17.5813 15.3787 15.0825 12.8799 12.0001 12.8799Z" fill="#222222"/>
                      </svg>
                      <div class="${TAG}-header-nav-right-user-dropdown">
                          <div class="${TAG}-header-nav-right-user-dropdown-default">
                              <ul>
                                  <li style="font-weight:bold;background-color:white;cursor:default;" class="${TAG}-header-nav-right-user-dropdown-username"></li>
                                  <li>
                                      <a href="/My-Account/Basics">My Account</a>
                                  </li>
                                  <li>
                                      <a href="/My-Purchases">My Purchases</a>
                                  </li>
                                  <li>
                                      <a href="https://easel.teacherspayteachers.com/activities">My Easel Library</a>
                                  </li>
                                  <li>
                                      <a href="/Wish-List">Wish List</a>
                                  </li>
                                  <li>
                                      <a href="/gift-card">Gift Cards</a>
                                  </li>
                              </ul>
                              <ul class="${TAG}-header-nav-right-user-dropdown-focused">
                                  <li>
                                      <a href="/TpTClassFund">TPT ClassFund</a>
                                  </li>
                                  <li>
                                      <a href="/TpTSchoolAccess/Teachers">TPT School Access</a>
                                  </li>
                                  <li class="${TAG}-hidden">
                                      <a href="/My-School" class="${TAG}-header-nav-right-user-dropdown-default-my-school">My School</a>
                                  </li>
                                  <li>
                                      <a href="/My-Account/Upgrade/Basic">Become a Seller</a>
                                  </li>
                              </ul>
                              <ul>
                                  <li>
                                      <a href="/Inbox">Inbox</a>
                                      <div class="${TAG}-header-nav-right-user-dropdown-counter"></div>
                                  </li>
                                  <li>
                                      <a href="/Account-Balance">Account Balance</a>
                                  </li>
                                  <li>
                                      <a href="/My-Account/Favorite_Sellers">My Favorite Sellers</a>
                                  </li>
                                  <li>
                                      <a href="/Assistant-Dashboard">VA Dashboard</a>
                                      <div class="${TAG}-header-nav-right-user-dropdown-new ${TAG}-header-nav-right-user-dropdown-new-2">BETA</div>
                                  </li>
                                  <li class="${TAG}-header-nav-right-user-dropdown-focused">
                                      <a href="/Logout">Log Out</a>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="${TAG}-header-search"></div>
      </div>
  </div>
`;

export default newHeaderHTML;
