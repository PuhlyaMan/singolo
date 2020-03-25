window.onload = function() {
  addScrollHandler();
  addSlideButtonClickHandler();
  addPhoneClickHandler();
  addPortfolioPictureClickHandler();
  addPortfolioFilterClickHandler();
  addSubmitButtonClickHandler();
  addModalButtonClickHandler();
};

const addScrollHandler = () => {
  window.addEventListener('scroll', () => {
    const fromTop = window.scrollY + 95;
    const docElement = document.documentElement;

    document.querySelectorAll('.slider, body > section').forEach(block => {
      if (block.offsetTop <= fromTop && block.offsetTop + block.offsetHeight > fromTop) {
        removeSelectedNavLink();
        document.querySelectorAll('.navigation__link').forEach(link => {
          if (block.getAttribute('id') === link.getAttribute('href').substring(1)) {
            selectedMenuLink(link);
          }
        });
      }
    });
    if (docElement.clientHeight + docElement.scrollTop >= docElement.scrollHeight) {
      removeSelectedNavLink();
      selectedMenuLink(document.querySelector(`[href='#quote']`));
    }
  });
};

const removeSelectedNavLink = () => {
  const navItems = document.querySelectorAll('.navigation .navigation__link');
  navItems.forEach(navItem => {
    navItem.classList.remove('navigation__link_active');
  });
};

const selectedMenuLink = link => {
  link.classList.add('navigation__link_active');
};

const addSlideButtonClickHandler = () => {
  document.querySelectorAll('.arrow').forEach(arrow => {
    arrow.addEventListener('click', e => {
      const clickedArrow = e.target;
      const direction = clickedArrow.classList.contains('arrow_right') ? 'right' : 'left';
      moveSlide(direction);
    });
  });
};

const createSlideItemsArray = () => {
  let arrItems = [];
  document.querySelectorAll('.slider__item').forEach((slide, index) => {
    arrItems.push({ slide: slide, slideIndex: index, transform: 0 });
  });
  return arrItems;
};

let sliderItems = createSlideItemsArray();
let currentIndexSlide = 0;
let transformSlider = 0;

const moveSlide = direction => {
  if (direction === 'right') {
    currentIndexSlide++;
    if (currentIndexSlide > findIndex('max')) {
      const nextItem = findItem('min');
      nextItem.slideIndex = findIndex('max') + 1;
      nextItem.transform += sliderItems.length * 100;
      nextItem.slide.style.transform = 'translateX(' + nextItem.transform + '%)';
    }
    transformSlider -= 100;
  }
  if (direction === 'left') {
    currentIndexSlide--;
    if (currentIndexSlide < findIndex('min')) {
      const prevItem = findItem('max');
      prevItem.slideIndex = findIndex('min') - 1;
      prevItem.transform -= sliderItems.length * 100;
      prevItem.slide.style.transform = 'translateX(' + prevItem.transform + '%)';
    }
    transformSlider += 100;
  }
  document.querySelector('.slider__items').style.transform = 'translateX(' + transformSlider + '%)';
};

const findIndex = key => {
  const indexes = sliderItems.map(item => item.slideIndex);
  return key === 'max' ? Math.max(...indexes) : Math.min(...indexes);
};

const findItem = key => {
  const indexes = sliderItems.map(item => item.slideIndex);
  const findSlideIndex = key === 'min' ? Math.min(...indexes) : Math.max(...indexes);
  return sliderItems[indexes.indexOf(findSlideIndex)];
};

const addPhoneClickHandler = () => {
  document.querySelectorAll('.phone').forEach(phone => {
    phone.addEventListener('click', e => {
      const clickedPhoneItem = e.target;
      if (checkInteractiveItem(clickedPhoneItem)) {
        actionForLayout(clickedPhoneItem);
      }
    });
  });
};

const checkInteractiveItem = clickedPhoneItem => {
  const classList = clickedPhoneItem.classList;
  return classList.contains('layer') || classList.contains('circle') || classList.contains('square');
};

const actionForLayout = clickedPhoneItem => {
  [...clickedPhoneItem.parentElement.children].forEach(child => {
    if (child.classList.contains('layer')) {
      child.classList.toggle('layer_off');
    }
  });
};

const addPortfolioPictureClickHandler = () => {
  document.querySelector('.portfolio__gallery').addEventListener('click', e => {
    if (e.target.parentNode.classList.contains('portfolio__picture')) {
      const clickPortfolioPicture = e.target;
      const currentSelectedPortfolioPicture = document.querySelector('.portfolio__picture_active');
      removeSelectePortfolioPicture();
      if (clickPortfolioPicture !== currentSelectedPortfolioPicture)
        selectClickedPortfolioPicture(clickPortfolioPicture);
    }
  });
};

const removeSelectePortfolioPicture = () => {
  const portfolioPictures = document.querySelectorAll('.portfolio__picture');
  portfolioPictures.forEach(picture => {
    picture.children[0].classList.remove('portfolio__picture_active');
  });
};

const selectClickedPortfolioPicture = clickPortfolioPicture => {
  clickPortfolioPicture.classList.add('portfolio__picture_active');
};

const addPortfolioFilterClickHandler = () => {
  document.querySelector('.filter').addEventListener('click', e => {
    if (e.target.classList.contains('filter__button')) {
      const clickedFilterButton = e.target;
      removeSelectePortfolioPicture();
      removeSelectedFilterButton();
      selectClickedFilterButton(clickedFilterButton);
      removeAllPortfolioPictures();
      addPortfolioPictures(clickedFilterButton);
      hideNonFilterPictures(clickedFilterButton);
    }
  });
};

const removeSelectedFilterButton = () => {
  const filterButtons = document.querySelectorAll('.filter__button');
  filterButtons.forEach(button => {
    button.classList.remove('filter__button_active');
  });
};

const selectClickedFilterButton = clickedFilterButton => {
  clickedFilterButton.classList.add('filter__button_active');
};

const removeAllPortfolioPictures = () => {
  document.querySelectorAll('.portfolio__picture').forEach(picture => picture.remove());
};

const DEFAULT_PICTURES = [...document.querySelectorAll('.portfolio__picture')];

const sortPortfolioPictures = () => {
  return [...DEFAULT_PICTURES].sort(() => Math.random() - 0.5);
};

const addPortfolioPictures = clickedFilterButton => {
  const typeFilter = clickedFilterButton.dataset.typeFilter;
  if (typeFilter === 'all') {
    document.querySelector('.portfolio__gallery').prepend(...DEFAULT_PICTURES);
  } else {
    const sortPictures = sortPortfolioPictures();
    document.querySelector('.portfolio__gallery').prepend(...sortPictures);
  }
};

const hideNonFilterPictures = clickedFilterButton => {
  const typeFilter = clickedFilterButton.dataset.typeFilter;
  document.querySelectorAll('.portfolio__picture').forEach(picture => {
    if (picture.dataset.typePicture !== typeFilter && typeFilter !== 'all') {
      picture.style.display = 'none';
    } else {
      picture.style.display = 'block';
    }
  });
};

const addSubmitButtonClickHandler = () => {
  document.querySelector('.button-submit').addEventListener('click', e => {
    if (validateRequareInput()) {
      setInputValueInModalWindow();
      showHideModalWindow();
      e.preventDefault();
    }
  });
};

const validateRequareInput = () => {
  const name = document.querySelector('#name');
  const email = document.querySelector('#email');
  return email.checkValidity() && name.checkValidity();
};

const setInputValueInModalWindow = () => {
  const subjectValue = getInputValue('#subject');
  const describeValue = getInputValue('#describe');
  document.querySelector('.modal-subject').innerHTML = subjectValue
    ? `<b>Subject:</b> ${subjectValue}`
    : 'Without subject';
  document.querySelector('.modal-describe').innerHTML = describeValue
    ? `<b>Description:</b> ${describeValue}`
    : 'Without description';
};

const getInputValue = selector => {
  return document.querySelector(selector).value.trim();
};

const showHideModalWindow = () => {
  document.querySelector('.modal-overlay').classList.toggle('close');
  document.querySelector('.modal').classList.toggle('close');
};

const addModalButtonClickHandler = () => {
  document.querySelector('.modal-button').addEventListener('click', e => {
    showHideModalWindow();
    document.querySelector('.form').reset();
  });
};
