import React, { useState } from "react";
import {
    ConsoleLogger,
    DefaultDeviceController,
    DefaultMeetingSession,
    MeetingSessionConfiguration,
    DefaultModality,

} from "amazon-chime-sdk-js";
//Your helper for creating meeting
import { createMeeting } from "../../helpers/ApiHelper";

let meetingSession;
let testAudio = false;
const Meeting = (props) => {
    const [meetingStarted, setMeetingStatus] = useState(false);

    const [meetingId, setMeetingId] = useState("");
    const [muteAudio, setMuteStatus] = useState(false);
    const [sharingVideo, setVideoStatus] = useState(false);

    const [shareScreen, setScreenShareStatus] = useState(false);
    const joinMeeting = async () => {
        if (!!meetingId) {
            try {
                setMeetingStatus(true);
                const data = await createMeeting(meetingId);

                const logger = new ConsoleLogger("MyLogger", "");
                const deviceController = new DefaultDeviceController(logger);

                // You need responses from server-side Chime API. See below for details.
                // const meetingResponse = /* The response from the CreateMeeting API action */;
                // const attendeeResponse = /* The response from the CreateAttendee or BatchCreateAttendee API action */;
                const configuration = new MeetingSessionConfiguration(
                    data.Meeting,
                    data.Attendee
                );

                // In the usage examples below, you will use this meetingSession object.
                meetingSession = new DefaultMeetingSession(
                    configuration,
                    logger,
                    deviceController
                );

                // In the usage examples below, you will use this meetingSession object.
                const audioInputs = await meetingSession.audioVideo.listAudioInputDevices();


                await meetingSession.audioVideo.chooseAudioInputDevice(
                    audioInputs[0].deviceId
                );


                let localTileId = null;
                const observer = {
                    audioVideoDidStart: () => {
                        console.log('Started');
                    },
                    audioVideoDidStop: sessionStatus => {
                        // See the "Stopping a session" section for details.
                        console.log('Stopped with a session status code: ', sessionStatus.statusCode());
                    },
                    videoTileDidUpdate: (tileState) => {
                        // Ignore a tile without attendee ID and other attendee's tile.
                        if (!tileState.boundAttendeeId) {
                            return;
                        }
                        if (shareScreen && !tileState.isContent) {
                            return;
                        }
                        const yourAttendeeId = meetingSession.configuration.credentials.attendeeId;
                        const boundAttendeeId = tileState.boundAttendeeId;

                        // Get the attendee ID from "attendee-id#content".
                        const baseAttendeeId = new DefaultModality(boundAttendeeId).base();
                        if (baseAttendeeId === yourAttendeeId) {
                            console.log('You called startContentShareFromScreenCapture');
                        }

                        updateTiles(meetingSession);
                    },
                    videoTileWasRemoved: tileId => {
                        if (localTileId === tileId) {
                            localTileId = null;
                        }
                    },
                    contentShareDidStart: () => {
                        meetingSession.audioVideo.stopLocalVideoTile();
                        setVideoStatus(true);
                    },
                    contentShareDidStop: () => {
                        // Chime SDK allows 2 simultaneous content shares per meeting.
                        // This method will be invoked if two attendees are already sharing content
                        // when you call startContentShareFromScreenCapture or startContentShare.
                        meetingSession.audioVideo.stopLocalVideoTile();
                        setVideoStatus(true);
                    },


                };

                meetingSession.audioVideo.addContentShareObserver(observer);
                meetingSession.audioVideo.addObserver(observer);
                const audioOutputElement = document.getElementById("meeting-audio");
                meetingSession.audioVideo.bindAudioElement(audioOutputElement);
                meetingSession.audioVideo.start();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const updateTiles = (meetingSession) => {
        const tiles = meetingSession.audioVideo.getAllVideoTiles();
        tiles.forEach((tile) => {
            let tileId = tile.tileState.tileId;
            let boundExternalUserId = tile.tileState.boundExternalUserId;
            let currentUser = localStorage.getItem(
                "CognitoIdentityServiceProvider.6gjg98cspkpbt91hoafdu6lq43.LastAuthUser"
            );
            var videoElement = document.getElementById("video-" + tileId);

            if (!videoElement) {
                videoElement = document.createElement("video");
                videoElement.id = "video-" + tileId;
                //videoElement.className = 'me' + tileId;
                videoElement.className = (currentUser === boundExternalUserId ? 'me' : 'other');
                // videoElement.classList.add(currentUser  === boundExternalUserId ? 'me' : 'other');
                document.getElementById("video-list").append(videoElement);
                meetingSession.audioVideo.bindVideoElement(tileId, videoElement);
            }
        });
    }

    const shareVideo = async (event) => {
        event.preventDefault();

        if (sharingVideo) {
            meetingSession.audioVideo.stopLocalVideoTile();
        } else {
            try {
                const videoInputs = await meetingSession.audioVideo.listVideoInputDevices();
                await meetingSession.audioVideo.chooseVideoInputDevice(
                    videoInputs[0].deviceId
                );
                meetingSession.audioVideo.startLocalVideoTile();
            }
            catch (err) {
                alert(err)
            }
        }
        setVideoStatus(!sharingVideo);
    }


    //Need to fix this as there's an issue when using react hooks with aws chime mute and unmute
    const audioMuteUnmute = async (event) => {
        event.preventDefault();
        try {
            if (testAudio) {
                const result = await meetingSession.audioVideo?.realtimeUnmuteLocalAudio();
                testAudio = false;
                return
            }
            const result = await meetingSession.audioVideo?.realtimeMuteLocalAudio();
            testAudio = true;

        }
        catch (err) { }

    }


    const MeetingElement = () => {

        return (
            <div>
                <div style={{ border: "2px solid black", height: "80vh" }}>


                    <button
                        onClick={($event) => shareVideo($event)}
                    >
                        {sharingVideo ? "Stop Video" : "Share Video"}
                    </button>
                    {/* <button
              onClick={($event) => audioMuteUnmute($event)}
            >
              {testAudio ? "Unmute" : "Mute"}
            </button> */}

                    <button
                        onClick={async () => {
                            try {

                                if (shareScreen) {
                                    meetingSession.audioVideo.stopContentShare();

                                } else {
                                    // meetingSession.audioVideo.stopLocalVideoTile();
                                    // setVideoStatus(true);
                                    const contentShareStream = await meetingSession.audioVideo.startContentShareFromScreenCapture();

                                }


                            }
                            catch (error) {
                                console.log(error);
                            }
                            setScreenShareStatus(!shareScreen);
                        }}
                    >
                        {shareScreen ? "Stop Sharing" : "Start Sharing"}
                    </button>
                    <audio
                        controls
                        id="meeting-audio"
                        style={{ display: "none" }}
                    ></audio>
                    <div id="video-list"></div>
                    {/* <ContentShareControl /> */}
                </div>

                <button onClick={audioMuteUnmute}>
                    {testAudio ? 'Umute myself' : 'Mute'}
                </button>
            </div>
        );
    };

    return (
        <>
            <input
                type="text"
                value={meetingId}
                onChange={(e) => {
                    setMeetingId(e.target.value);
                }}
                hint={"Enter Meeting ID"}
            />
            <button onClick={joinMeeting}>Join</button>
            {meetingStarted && <MeetingElement />}
        </>
    );
};

export default Meeting;
