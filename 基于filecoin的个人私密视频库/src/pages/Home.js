import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { Logo } from "../images/Netflix";
import {
  ConnectButton,
  Icon,
  TabList,
  Tab,
  Button,
  Modal,
  useNotification,
  Input,
  Loading
} from "web3uikit";
import { movies } from "../helpers/library";
import { useState, useRef } from "react";
import { useMoralis } from "react-moralis";
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'

const Home = () => {
  const [visible, setVisible] = useState(false);
  const [moviesme, setMoviesme] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [theFile, setTheFile] = useState();
  const [selectedFilm, setSelectedFilm] = useState();
  const { isAuthenticated, Moralis, account } = useMoralis();
  const [video, setVideo] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [genre, setGenre] = useState();
  const [actors, setActors] = useState();
  const [year, setYear] = useState();
  const [duration, setDuration] = useState();
  const [myMovies, setMyMovies] = useState();
  const inputFile = useRef(null);
  const [sendingd, setSendingStated] = useState(false);

  const onImageClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  async function save() {
    setSendingStated(true)

    const MoMovies = Moralis.Object.extend("MoMovies");
    const newMovie = new MoMovies();

    newMovie.set("name", name);
    newMovie.set("description", description);
    newMovie.set("genre", genre);
    newMovie.set("actors", actors);
    newMovie.set("year", year);
    newMovie.set("duration", duration);
    newMovie.set("acc", account);

    const client = new Web3Storage({ token:  });

    if(theFile) {
      newMovie.set("screenName", theFile.name);
      const rootCid = await client.put([theFile]);
      console.log("https://" + rootCid + ".ipfs.dweb.link");
      newMovie.set("screen", "https://" + rootCid + ".ipfs.dweb.link");
    }

    if(video) {
      newMovie.set("movieName", video.name);
      const rootCid = await client.put([video]);
      console.log("https://" + rootCid + ".ipfs.dweb.link");
      newMovie.set("movie", "https://" + rootCid + ".ipfs.dweb.link");
    }

    await newMovie.save();
    setSendingStated(false)


    window.location.reload();
    
    

  }

  useEffect(() => {
    async function fetchMyList() {

      try {
        const user = Moralis.User.current();
        const MMovies = Moralis.Object.extend("MoMovies");
        const query = new Moralis.Query(MMovies);
        query.equalTo("acc", account);
        const results = await query.find();
        results.map((e, i) =>{
          console.log(e)
          const newitem = {
            Movie: e.attributes.movie+'/'+e.attributes.movieName,
            Thumnbnail: e.attributes.screen+'/'+e.attributes.screenName,
            Scene: e.attributes.screen+'/'+e.attributes.screenName,
            Logo: "",
            Name: e.attributes.name,
            Description: e.attributes.description,
            Genre: e.attributes.genre,
            Actors: e.attributes.actors,
            Year: e.attributes.year,
            Duration: e.attributes.duration,
          }
          movies.push(newitem)
          console.log(movies)
          
        })
        setMoviesme(movies);
        console.log(moviesme)
        
      } catch (error) { 
        console.error(error)
      }
    }

    fetchMyList();
  }, [account]);

  const dispatch = useNotification();

  
  const handleVideoUpload = (event) => {
      console.log(event.target.files);
      setVideo(event.target.files[0]);
  }

  const handleNewNotification = () => {
    dispatch({
      type: "error",
      message: "Pleaser Connect Your Crypto Wallet",
      title: "Not Authenticated",
      position: "topL",
    });
  };

  const handleAddNotification = () => {
    dispatch({
      type: "success",
      message: "Movie Added to List",
      title: "Success",
      position: "topL",
    });
  };

  return (
    <>
      <div className="connect">
      <div >
        <Button
            id="test-button-primary"
            onClick={()=>{
              Moralis.User.logOut().then(()=>{
                window.location.reload();
              })
            }}
            text="退出登录"
            theme="colored"
            type="button"
            color="blue"
          />
      </div>
        <Icon fill="#ffffff" size={24} svg="bell" />
        <ConnectButton />
      </div>
      <div className="topBanner">
        <TabList defaultActiveKey={1} tabStyle="bar">
          <Tab tabKey={1} tabName={"我的视频"}>
            <div className="scene">
              <img src={movies[0].Scene} className="sceneImg"></img>
              <img className="sceneLogo" src={movies[0].Logo}></img>
              <p className="sceneDesc">{movies[0].Description}</p>
              <div className="playButton">
                <Button
                  icon="chevronRightX2"
                  text="Play"
                  theme="secondary"
                  type="button"
                />
                <Button
                  icon="plus"
                  text="Add to My List"
                  theme="translucent"
                  type="button"
                  onClick={() => {
                    console.log(myMovies);
                  }}
                />
              </div>
            </div>

            <div className="title">Movies</div>
            <div className="thumbs">
              {moviesme &&
                moviesme.map((e) => {
                  return (
                    <>
                    
                    <img
                      src={e.Thumnbnail}
                      className="thumbnail"
                      onClick={() => {
                        setSelectedFilm(e);
                        setVisible(true);
                      }}
                    ></img>
                    </>
                  );
                })}
            </div>
          </Tab>
          <Tab tabKey={2} tabName={"上传视频"}>
            <div className="ownListContent">
              <div className="title">Your Library
              <div style={{'padding':'20px 0px'}}>
              <Button
                id="test-button-primary"
                onClick={save}
                text="点击提交"
                theme="colored"
                type="button"
                color="yellow"
              />
              </div>
              {sendingd && 
            <div
              style={{
                backgroundColor: '#161616',
                borderRadius: '8px',
                padding: '20px'
              }}
            >
              <Loading
                spinnerColor="#2E7DAF"
                text="UpLoading...."
              />
            </div>
          }
              </div>
              
                    
                  
              {isAuthenticated ? (
                <>
                  <div className="ownThumbs" style={{'textAlign':'center', 'padding':'20px'}}>
                  <div style={{'textAlign':'center', 'padding':'20px'}}>
                  <Input
                    labelBgColor=" #161616"
                    label="Token"
                    name="Test Password Input"
                    onBlur={function noRefCheck(){}}
                    onChange={function noRefCheck(){}}
                    type="password"
                  />
                  </div>
                  <div style={{'textAlign':'center', 'padding':'20px'}}>
                    <Input
                      labelBgColor='#161616'
                      label="Name"
                      name="Test text Input"
                      onBlur={function noRefCheck(){}}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div style={{'textAlign':'center', 'padding':'20px'}}>
                    <Input
                      labelBgColor='#161616'
                      label="Description"
                      name="Test text Input"
                      onBlur={function noRefCheck(){}}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div style={{'textAlign':'center', 'padding':'20px'}}>
                    <Input
                      labelBgColor='#161616'
                      label="Genre"
                      name="Test text Input"
                      onBlur={function noRefCheck(){}}
                      onChange={(e) => setGenre(e.target.value)}
                    />
                  </div>
                  <div style={{'textAlign':'center', 'padding':'20px'}}>
                    <Input
                      labelBgColor='#161616'
                      label="Actors"
                      name="Test text Input"
                      onBlur={function noRefCheck(){}}
                      onChange={(e) => setActors(e.target.value)}
                    />
                    </div>
                  <div style={{'textAlign':'center', 'padding':'20px'}}>
                    <Input
                      labelBgColor='#161616'
                      label="Year"
                      name="Test text Input"
                      onBlur={function noRefCheck(){}}
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </div>
                  <div style={{'textAlign':'center', 'padding':'20px'}}>
                    <Input
                      labelBgColor='#161616'
                      label="Duration"
                      name="Test text Input"
                      onBlur={function noRefCheck(){}}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>
                  </div>
                    <div className style={{'textAlign':'center'}}>
                      {selectedFile && (
                          <img src={selectedFile} className="tweetImg" ></img>
                      )}
                    </div>
                    <div className="imgDiv" onClick={onImageClick}>
                    <input
                        type="file"
                        name="file"
                        ref={inputFile}
                        onChange={changeHandler}
                        style={{ display: "none"}}
                      />
                      <Icon fill="#1DA1F2" size={40} svg="image"></Icon>
                  </div>  
                  <div style={{'textAlign':'center'}}>
                    <input  type="file" onChange={handleVideoUpload}></input>  
                  </div>
                  

                </>
              ) : (
                <div className="ownThumbs">
                  You need to Authenicate TO View Your Own list
                </div>
              )}
            </div>
          </Tab>
        </TabList>
        {selectedFilm && (
          <div className="modal">
            <Modal
              onCloseButtonPressed={() => setVisible(false)}
              isVisible={visible}
              hasFooter={false}
              width="1000px"
            >
              <Button
                  icon="plus"
                  text="."
                  
                  type="button"
                  onClick={() => {
                    setVisible(false);
                  }}
                />
              <div className="modalContent">
                <img src={selectedFilm.Scene} className="modalImg"></img>
                <img className="modalLogo" src={selectedFilm.Logo}></img>
                <div className="modalPlayButton">
                  {isAuthenticated ? (
                    <>
                      <Link to="/player" state={selectedFilm.Movie}>
                        <Button
                          icon="chevronRightX2"
                          text="Play"
                          theme="secondary"
                          type="button"
                        />
                      </Link>
                      <Button
                        icon="plus"
                        text="Add to My List"
                        theme="translucent"
                        type="button"
                        onClick={async () => {
                          await Moralis.Cloud.run("updateMyList", {
                            addrs: account,
                            newFav: selectedFilm.Name,
                          });
                          handleAddNotification();
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <Button
                        icon="chevronRightX2"
                        text="Play"
                        theme="secondary"
                        type="button"
                        onClick={handleNewNotification}
                      />
                      <Button
                        icon="plus"
                        text="Add to My List"
                        theme="translucent"
                        type="button"
                        onClick={handleNewNotification}
                      />
                    </>
                  )}
                </div>
                <div className="movieInfo">
                  <div className="description">
                    <div className="details" style={{'color':'black'}}>
                      <span>{selectedFilm.Year}</span>
                      <span>{selectedFilm.Duration}</span>
                    </div>
                    <div style={{'color':'black'}}>{selectedFilm.Description}</div>
                    <div className="details" style={{'color':'black'}}>
                      <span>{selectedFilm.Movie}</span>
                    </div>
                  </div>
                  <div className="detailedInfo">
                    Genre:
                    <span className="deets" style={{'color':'black'}}>{selectedFilm.Genre}</span>
                    <br />
                    Actors:
                    <span className="deets" style={{'color':'black'}}>{selectedFilm.Actors}</span>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
