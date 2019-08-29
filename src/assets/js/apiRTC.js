
  var webRTCClient = null,
      audioSelect = document.querySelector("select#audioSource"),
      callId = null,
      videoSelect = document.querySelector("select#videoSource");


  function selectMediaChange(){
      console.log('selectMediaChange');
      webRTCClient.setAudioSourceId(audioSelect.value);
      //Storing audioSourceId in localStorage
      localStorage.setItem("audioSourceId_" + apiRTC.session.apiCCId, audioSelect.value);
      webRTCClient.setVideoSourceId(videoSelect.value);
      //Storing videoSourceId in localStorage
      localStorage.setItem("videoSourceId_" + apiRTC.session.apiCCId, videoSelect.value);
  }

  audioSelect.onchange = selectMediaChange;
  videoSelect.onchange = selectMediaChange;

  function refreshVideoView() {
      if ((typeof device !== "undefined") && device.platform == 'iOS'){
          console.log("REFRESH");
          cordova.plugins.iosrtc.refreshVideos();
      }
  }

  function incomingCallHandler(e) {
      $("#call").hide();
      $("#recordedCallVideo").hide();
      $("#hangup").show();
      $("#number").hide();
      $('#status').hide();
      setTimeout(refreshVideoView,2000);
  }

//UpdateMediaDeviceOnCall
  function userMediaStopHandler(e) {
      console.log('userMediaStopHandler :', e.detail);
      webRTCClient.removeElementFromDiv('mini', 'miniElt-' + e.detail.callId);
  }

  function remoteStreamRemovedHandler(e) {
      console.log("remoteStreamRemovedHandler, e.detail :" + e.detail);
      webRTCClient.removeElementFromDiv('remote', 'remoteElt-' + e.detail.callId);
  }
//UpdateMediaDeviceOnCall

  function hangupHandler(e) {
      console.log('hangupHandler :' + e.detail.callId);
      if (e.detail.lastEstablishedCall === true) {
          $("#call").attr("disabled", false).val("Call");
      }
      console.log(e.detail.reason);
      initMediaElementState(e.detail.callId);
      callId = 0;

      $("#call").show();
      $("#recordedCallVideo").show();
      $("#number").show();
      $("#hangup").hide();
  }

  function userMediaErrorHandler(e) {
      $("#call").show();
      $("#recordedCallVideo").show();
      $("#number").show();
      $("#hangup").hide();
  }

  function initMediaElementState(cId) {
      webRTCClient.removeElementFromDiv('mini', 'miniElt-' + cId);
      webRTCClient.removeElementFromDiv('remote', 'remoteElt-' + cId);
  }

  function userMediaSuccessHandler(e) {
      callId = e.detail.callId;
      console.log("userMediaSuccessHandler e.detail.callId :" + e.detail.callId);
      console.log("userMediaSuccessHandler e.detail.callType :" + e.detail.callType);
      console.log("userMediaSuccessHandler e.detail.remoteId :" + e.detail.remoteId);
      console.log("userMediaSuccessHandler e.detail.audioIsAvailable :" + e.detail.audioIsAvailable);
      console.log("userMediaSuccessHandler e.detail.videoIsAvailable :" + e.detail.videoIsAvailable);
      var streamType = 'video';

      if( e.detail.videoIsAvailable === false) {
          streamType = 'audio';
      }
      webRTCClient.addStreamInDiv(e.detail.stream, streamType, "mini", 'miniElt-' + e.detail.callId, {width : "160px", height : "120px"}, true);
  }

  function remoteStreamAddedHandler(e) {
      refreshVideoView();
      console.log("remoteStreamAddedHandler:");
      console.log("remoteStreamAddedHandler, e.detail.callId :" + e.detail.callId);
      console.log("remoteStreamAddedHandler, e.detail.callType :" + e.detail.callType);
      console.log("remoteStreamAddedHandler e.detail.remoteId :" + e.detail.remoteId);
      console.log("remoteStreamAddedHandler e.detail.destCallType :" + e.detail.destCallType);
      webRTCClient.addStreamInDiv(e.detail.stream, e.detail.destCallType, "remote", 'remoteElt-' + e.detail.callId, {}, false);
  }

  function gotSources(sourceInfos) {
      console.log('gotSources');
      var audioDeviceFound = false,
      videoDeviceFound = false,
      i = 0,
      audioSourceIdInLocalStorage = localStorage.getItem('audioSourceId_' + apiRTC.session.apiCCId),
      videoSourceIdInLocalStorage = localStorage.getItem('videoSourceId_' + apiRTC.session.apiCCId);

      if(sourceInfos !== null) {
          for (i = 0; i != sourceInfos.length; ++i) {
              var sourceInfo = sourceInfos[i];
              console.log('sourceInfo :', sourceInfo);
              var option = document.createElement("option");
              option.value = sourceInfo.id || sourceInfo.deviceId;
              console.log('option.value :', option.value);
              //ENUMERATE
              if (sourceInfo.kind === 'audio' || sourceInfo.kind === 'audioinput') {
                  //ENUMERATE
                  console.log('audio');
                  option.text = sourceInfo.label || 'microphone ' + (audioSelect.length);
                  audioSelect.appendChild(option);
                  //ENUMERATE
              } else if (sourceInfo.kind === 'video' || sourceInfo.kind === 'videoinput') {
                  //ENUMERATE
                  console.log('video');
                  option.text = sourceInfo.label || 'camera ' + (videoSelect.length);
                  videoSelect.appendChild(option);
              } else {
                  console.log('Some other kind of source: ', sourceInfo);
              }
              if (sourceInfo.id === audioSourceIdInLocalStorage) {
                  audioDeviceFound = true;
              }
              if (sourceInfo.id === videoSourceIdInLocalStorage) {
                  videoDeviceFound = true;
              }
          }
      } else {
          console.log("Media detection is not supported by browser");
      }

      if (audioDeviceFound) {
          console.log("setting with localStorage audioSourceId value");
          audioSelect.value = audioSourceIdInLocalStorage;
          webRTCClient.setAudioSourceId(audioSourceIdInLocalStorage);
      } else {
          //removing audioSourceId from localStorage
          localStorage.removeItem("audioSourceId_" + apiRTC.session.apiCCId);
      }
      if (videoDeviceFound) {
          console.log("setting with localStorage videoSourceId value");
          videoSelect.value = videoSourceIdInLocalStorage;
          webRTCClient.setVideoSourceId(videoSourceIdInLocalStorage);
      } else {
          //removing videoSourceId from localStorage
          localStorage.removeItem("videoSourceId_" + + apiRTC.session.apiCCId);
      }
  }

  function MCURecordingStartedHandler(e) {
      console.log("MCURecordingStartedHandler :", e.detail);
      console.log("MCURecordingStartedHandler mediaURL :", e.detail.mediaURL);
  }

  function MCURecordedStreamsAvailableHandler(e) {
      $("#recordedStreamList").show();
      $("#recordedStreamList").append('<li class="collection-item" id=' + e.detail.recordedFileName + '><div>' + 'File : ' + e.detail.recordedFileName + '<a href="' + e.detail.mediaURL + '" target="_blank" class="secondary-content">Play</a></div></li>');
  }

  function sessionReadyHandler(e) {
      console.log('sessionReadyHandler:' + apiRTC.session.apiCCId);
      console.log('CallId:' + e.detail.callId);
      apiRTC.addEventListener("incomingCall", incomingCallHandler);
      apiRTC.addEventListener("userMediaError", userMediaErrorHandler);
      apiRTC.addEventListener("remoteStreamAdded", remoteStreamAddedHandler);
      apiRTC.addEventListener("userMediaSuccess", userMediaSuccessHandler);
      //UpdateMediaDeviceOnCall
      apiRTC.addEventListener("userMediaStop", userMediaStopHandler);
      apiRTC.addEventListener("remoteStreamRemoved", remoteStreamRemovedHandler);
      //UpdateMediaDeviceOnCall
      apiRTC.addEventListener("MCURecordingStarted", MCURecordingStartedHandler);
      apiRTC.addEventListener("MCURecordedStreamsAvailable", MCURecordedStreamsAvailableHandler);
      apiRTC.addEventListener("hangup", hangupHandler);

      webRTCClient = apiRTC.session.createWebRTCClient({
              status: "status" //Optionnal
          });
      webRTCClient.getMediaDevices(gotSources);
      webRTCClient.setAllowMultipleCalls(true);
      webRTCClient.setMCUConnector('mcu4.apizee.com');

      $('#localNumber').html("Your local ID :<BR/>"+apiCC.session.apiCCId);
      $('#myMiniVideo').show();
      $('#status').hide();

      //UpdateMediaDeviceOnCall
      $("#updateMediaDeviceOnCall").click(function () {
          console.log('updateMediaDeviceOnCall callId :' + callId);
          console.log('updateMediaDeviceOnCall e.detail.callId :' + e.detail.callId);
          console.log("updateMediaDeviceOnCall");
          webRTCClient.updateMediaDeviceOnCall(callId);
      });
      $("#call").click(function () {
          $("#call").hide();
          $("#recordedCallVideo").hide();
          $("#number").hide();
          $("#hangup").show();
          $('#status').hide();

          destNumber = $("#number").val();
          console.log("send REFRESH");
          setTimeout(refreshVideoView,4000);
          webRTCClient.call(destNumber);
      });
      $("#hangup").click(function () {
          $("#call").show();
          $("#recordedCallVideo").show();
          $("#number").show();
          $("#hangup").hide();

          webRTCClient.hangUp();
      });

      //Call establishment (recorded call)
      $("#recordedCallVideo").click(function () {
          $("#call").hide();
          $("#recordedCallVideo").hide();
          $("#hangup").show();
          $("#hangup").attr("disabled", false).val("Hangup");

          webRTCClient.hangUp();
          var data = {
          };
          var callConfiguration = {
              record: true
          };
          callId = webRTCClient.call($("#number").val(), data, callConfiguration);
          console.log("callId on call =" + callId);
          if (callId != null) {
              addHangupButton(callId);
          }
      });
  }

  function addHangupButton(callId) {
      var hangupButtons = document.getElementById("hangupButtons"),
      input = document.createElement("input");
      input.setAttribute("id", "hangup-" + callId);
      input.setAttribute("value", "hangup-" + callId);
      input.setAttribute("type", "button");
      input.setAttribute("onclick", "webRTCClient.hangUp(" + callId + " );");
  }

  function onDeviceReady() {

      if ((typeof device !== "undefined") && device.platform == 'iOS'){
          cordova.plugins.iosrtc.registerGlobals();
      }

      if ((typeof device !== "undefined") && device.platform == 'Android'){
          var permissions = cordova.plugins.permissions;
          permissions.hasPermission(permissions.CAMERA, checkVideoPermissionCallback, null);
          permissions.hasPermission(permissions.RECORD_AUDIO, checkAudioPermissionCallback, null);

          function checkVideoPermissionCallback(status) {
              if(!status.hasPermission) {
                  var errorCallback = function() {
                      alert('Camera permission is not turned on');
                  }
                  permissions.requestPermission(
                          permissions.CAMERA,
                          function(status) {
                              if(!status.hasPermission) {
                                  errorCallback();
                              }
                          },
                          errorCallback);
              }
          }

          function checkAudioPermissionCallback(status) {
              if(!status.hasPermission) {
                  var errorCallback = function() {
                      alert('Audio permission is not turned on');
                  }
                  permissions.requestPermission(
                          permissions.RECORD_AUDIO,
                          function(status) {
                              if(!status.hasPermission) {
                                  errorCallback();
                              }
                          },
                          errorCallback);
              }
          }
      }

      apiRTC.init({
          //apiCCId : "12", // Your can overide your number
          onReady: sessionReadyHandler,
          apiKey : "e3f2a59d3d7ff5e7db178bb8ebb1549f"
      });
  }

  var app = document.URL.indexOf( 'https://' ) === -1;
  if ( app ) {
      document.addEventListener("deviceready", onDeviceReady, false);
  } else {
      onDeviceReady();
  }