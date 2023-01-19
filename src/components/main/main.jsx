import React, { useState, useEffect } from "react";
import main from "./main.module.scss";
import book1 from "./img/book.svg";
import deleteIcon from "./img/delete.svg";

function dataLength(book) {
  if (book.length > 5) {
    return book.slice(0, 4);
  } else {
    return book;
  }
}
function dataLength2(book2) {
  if (book2.length > 14) {
    return book2.slice(0, 14) + "...";
  } else {
    return book2;
  }
}
function dataTitleLength(book) {
  if (book.length > 20) {
    return book.slice(0, 20) + "...";
  } else {
    return book;
  }
}

function Main() {
  const [books, setUsers] = useState([]);
  const [bookmark, setBookmark] = useState([]);


  function renData(data) {
    let { items } = data;
    if (items.length > 9) {
      items = items.slice(0, 9);
      setUsers(items);
    }
  }

  useEffect(() => {
    const bookma = JSON.parse(localStorage.getItem("bookmark"));
    if (bookma) {
      setBookmark(bookma);
    }

    fetch("https://www.googleapis.com/books/v1/volumes?q=JavaScript")
      .then((res) => res.json())
      .then((data) => renData(data));
  }, []);

  function dataAdd(data) {
    if (bookmark.length) {
      for (let i = 0; i < bookmark.length; i++) {
        if (bookmark[i].id === data.id) {
          alert("Bu avval qo'shilgan");
          break;
        }
        if (bookmark.length - 1 === i) {
          setBookmark([...bookmark,data]);
          localStorage.setItem("bookmark", JSON.stringify(bookmark))
        }
      }
    } else {
      setBookmark([...bookmark,data]);
      localStorage.setItem("bookmark", JSON.stringify(bookmark));
    }
  }

  function delData(dataID){
    const newBook = (bookmark.filter((items)=> items.id !== dataID));
    setBookmark(newBook);
    localStorage.setItem('bookmark', JSON.stringify(newBook))

   }

  return (
    <div>
      <div className={main.container}>
        <div className={main.box}>
          <div className={main.box1}>
            <div className={main.inner_block}>
              <h4 className={main.inner_title}>Bookmarks</h4>
              <p className={main.inner_text}>
                If you don’t like to read, you haven’t found the right book
              </p>
            </div>

            {bookmark.map((book2) => (
              <div className={main.sup_block}>
                <div className={main.card}>
                  <div>
                    <h4 id={book2.id} className="card_title">
                      {dataLength2(book2.volumeInfo.title)}
                    </h4>
                    <p className={main.card_text}>
                      {dataLength(book2.volumeInfo.authors)}
                    </p>
                  </div>
                  <div className={main.card_icons}>
                    <img
                      className={main.card_icon}
                      src={book1}
                      alt="book img"
                    />
                    <img onClick={()=> delData(book2.id)}
                      className={main.card_icon2}
                      src={deleteIcon}
                      alt="delete img"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={main.container}>
            <div className={main.box2}>
              <div className={main.box2_cards}>
                {books?.map((book) => (
                  <div key={book.id}>
                    <div className={main.card2}>
                      <div id={book.id} className={main.card2_img}>
                        <img
                          src={book?.volumeInfo.imageLinks.thumbnail}
                          alt="img"
                        />
                      </div>
                      <h4 className={main.card2_title}>
                        {dataTitleLength(book.volumeInfo.title)}
                      </h4>
                      <p>{book.volumeInfo.authors}</p>
                      <p className={main.year}>
                        {dataLength(book.volumeInfo.publishedDate)}
                      </p>
                      <div className={main.buy_box}>
                        <div className={main.buy_1}>
                          <button
                            onClick={() => dataAdd(book)}
                            className={main.buy_button1}
                          >
                            Bookmark
                          </button>
                          <button className={main.buy_button2}>
                            More Info
                          </button>
                        </div>
                        <button className={main.buy_button3}>Read</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Main };

/* 
export const Main = () => {
  function renderData() {
    fetch("https://www.googleapis.com/books/v1/volumes?q=learn%20javaScript")
      .then((res) => res.json())
      .then((result) => dataRen(result));
  }

  renderData();

  function dataRen(data) {
    const { items } = data;
    items.forEach((item) => {
      console.log(item);
    });
  }

  return (
    <>
      <div className={main.container}>
        <div className={main.box}>
          <div className={main.box1}>
            <div className={main.inner_block}>
              <h4 className={main.inner_title}>Bookmarks</h4>
              <p className={main.inner_text}>
                If you don’t like to read, you haven’t found the right book
              </p>
            </div>
            <div className={main.sup_block}>
              <div className={main.card}>
                <div>
                  <h4 className={main.card_title}>Python</h4>
                  <p className={main.card_text}>David M. Beazley</p>
                </div>
                <div className={main.card_icons}>
                  <img className={main.card_icon} src={book} alt="bok img" />
                  <img
                    className={main.card_icon2}
                    src={deleteIcon}
                    alt="delete img"
                  />
                </div>
              </div>

              <div className={main.card}>
                <div>
                  <h4 className={main.card_title}>Java</h4>
                  <p className={main.card_text}>David M. Beazley</p>
                </div>
                <div className={main.card_icons}>
                  <img className={main.card_icon} src={book} alt="bok img" />
                  <img src={deleteIcon} alt="delete img" />
                </div>
              </div>

              <div className={main.card}>
                <div>
                  <h4 className={main.card_title}>С++</h4>
                  <p className={main.card_text}>David M. Beazley</p>
                </div>
                <div className={main.card_icons}>
                  <img className={main.card_icon} src={book} alt="bok img" />
                  <img src={deleteIcon} alt="delete img" />
                </div>
              </div>
            </div>
          </div>

          <div className={main.box2}>
            <div className={main.box2_cards}>
              <div className={main.card2}>
                <div className={main.card2_img}>
                  <img src={cardImg1} alt="img" />
                </div>
                <h4 className={main.card2_title}>Python</h4>
                <p>{item.volumeInfo.authors}</p>
                <p className={main.year}>2009</p>
                <div className={main.buy_box}>
                  <div className={main.buy_1}>
                    <button className={main.buy_button1}>Bookmark</button>
                    <button className={main.buy_button2}>More Info</button>
                  </div>
                  <button className={main.buy_button3}>Read</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}; */

/* 
    <div className={main.card2}>
      <div className={main.card2_img}>
  <img src={cardImg2} alt="img" />
  </div>
  <h4 className={main.card2_title}>Python</h4>
  <p>David M. Beazley</p>
  <p className={main.year}>2009</p>
  <div className={main.buy_box}>
    <div className={main.buy_1}>
      <button className={main.buy_button1}>Bookmark</button>
      <button className={main.buy_button2}>More Info</button>
    </div>
    <button className={main.buy_button3}>Read</button>
  </div>
    </div>

    <div className={main.card2}>
      <div className={main.card2_img}>
  <img src={cardImg3} alt="img" />
  </div>
  <h4 className={main.card2_title}>Python</h4>
  <p>David M. Beazley</p>
  <p className={main.year}>2009</p>
  <div className={main.buy_box}>
    <div className={main.buy_1}>
      <button className={main.buy_button1}>Bookmark</button>
      <button className={main.buy_button2}>More Info</button>
    </div>
    <button className={main.buy_button3}>Read</button>
  </div>
    </div>

  
    <div className={main.card2}>
      <div className={main.card2_img}>
  <img src={cardImg4} alt="img" />
  </div>
  <h4 className={main.card2_title}>Python</h4>
  <p>David M. Beazley</p>
  <p className={main.year}>2009</p>
  <div className={main.buy_box}>
    <div className={main.buy_1}>
      <button className={main.buy_button1}>Bookmark</button>
      <button className={main.buy_button2}>More Info</button>
    </div>
    <button className={main.buy_button3}>Read</button>
  </div>
    </div>

    
    <div className={main.card2}>
      <div className={main.card2_img}>
  <img src={cardImg5} alt="img" />
  </div>
  <h4 className={main.card2_title}>Python</h4>
  <p>David M. Beazley</p>
  <p className={main.year}>2009</p>
  <div className={main.buy_box}>
    <div className={main.buy_1}>
      <button className={main.buy_button1}>Bookmark</button>
      <button className={main.buy_button2}>More Info</button>
    </div>
    <button className={main.buy_button3}>Read</button>
  </div>
    </div>

    
    <div className={main.card2}>
      <div className={main.card2_img}>
  <img src={cardImg6} alt="img" />
  </div>
  <h4 className={main.card2_title}>Python</h4>
  <p>David M. Beazley</p>
  <p className={main.year}>2009</p>
  <div className={main.buy_box}>
    <div className={main.buy_1}>
      <button className={main.buy_button1}>Bookmark</button>
      <button className={main.buy_button2}>More Info</button>
    </div>
    <button className={main.buy_button3}>Read</button>
  </div>
    </div>
     */

// export const Main = () => {
//   const [inputValue1, setInputValue1] = useState("");
//   const [inputValue2, setInputValue2] = useState("");
//   const [inputValue3, setInputValue3] = useState("");
//   const submit = (event) => {
//     event.preventDefault();
//     console.log(inputValue1)
//     console.log(inputValue2)
//     console.log(inputValue3)
//   };
//   return (
//     <div className={MainCss.box}>
//       <h1 className={MainCss.text}>Hello User</h1>
//       <form onSubmit={submit} className={MainCss.form}>
//         <input
//           className={MainCss.input}
//           type="text"
//           value={inputValue1}
//           onChange={(e) => setInputValue1(e.target.value)}
//           name="name"
//           placeholder="your name"
//         />
//         <input
//           className={MainCss.input}
//           type="text"
//           value={inputValue2}
//           onChange={(e) => setInputValue2(e.target.value)}
//           name="email"
//           placeholder="your email"
//         />
//         <input
//           className={MainCss.input}
//           type="text"
//           value={inputValue3}
//           onChange={(e) => setInputValue3(e.target.value)}
//           name="phone"
//           placeholder="your phone"
//         />
//         <button className={MainCss.submit} type="submit">
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };
