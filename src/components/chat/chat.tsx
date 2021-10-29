import React, { useEffect, useRef, useState } from 'react'
import {
  MainContainer,
  ChatContainer,
  TypingIndicator,
  MessageSeparator,
  MessageList,
  Message,
  MessageInput,
  Sidebar,
  Search,
  ConversationList,
  Conversation,
  Avatar,
  ConversationHeader,
  VoiceCallButton,
  VideoCallButton,
  InfoButton,
  ArrowButton,
  // ExpansionPanel,
} from '@chatscope/chat-ui-kit-react'
import { TOGGLE_SHOW_CHAT } from '../../redux/constants'
import { useDispatch, useSelector } from 'react-redux'

import { ChatType } from '../../constants/chat'

import { socket } from '../../socket/socket-client'
import chatReducer from '../../redux/reducers/chatReducer'

interface ChatProps {
  width?: string;
  height: string;
  chatType: ChatType
}


export default function Chat({ height = '600px', width = 'auto', chatType }: ChatProps) {

  const { socketClient: socket } = useSelector(state => state.chatReducer)
  console.log({ socket })

  const dispatch = useDispatch()

  const [messageInputValue, setMessageInputValue] = useState('')

  const fileInput = useRef()

  const onClickHandler = () => {
    console.log(fileInput.current.click())
  }

  const inputChangeHandler = event => {
    console.log(event.target.files)
  }


  const sendMessageHandler = () => {
    socket.emit('SHOP_CHAT', {
      name: 'phd',
      content: messageInputValue,
    }, res => {
      console.log('socket res', res)
    })
    setMessageInputValue('')
  }
  // check socket is dispatched or not

  useEffect(() => {
  }, [])


  const lillyIco = 'https://cdn-icons-png.flaticon.com/512/147/147144.png'
  const joeIco = 'https://cdn1.vectorstock.com/i/1000x1000/31/95/user-sign-icon-person-symbol-human-avatar-vector-12693195.jpg'

  const emilyIco = 'https://toigingiuvedep.vn/wp-content/uploads/2021/05/hinh-anh-avatar-trang-dep-1.jpg'
  const kaiIco = 'https://allimages.sgp1.digitaloceanspaces.com/photographercomvn/2020/09/Tong-hop-hinh-anh-avatar-hai-huoc-nhin-la-bat.jpg'
  const akaneIco = 'https://i.ytimg.com/vi/8_Skx7B7MwQ/hqdefault.jpg'
  const eliotIco = 'https://meta.vn/Data/image/2021/08/17/con-vit-vang-tren-fb-la-gi-trend-anh-avatar-con-vit-vang-la-gi-3.jpg'

  const patrikIco = 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/4203820/original/cfef84cf8b38aaf4c40a5dadec562ce5fee498bf/create-a-flat-vector-avatar-of-you.jpg'
  const zoeIco = 'https://i2.wp.com/www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js.png?fit=438%2C408&ssl=1'


  return (
    <div style={{
      height: height,
      position: 'relative',
      width: width,
    }}>
      <input onChange={inputChangeHandler} ref={fileInput} style={{ display: 'none' }} type='file' id='file-input' />
      <MainContainer responsive>
        <Sidebar position='left' scrollable={false}>
          <Search placeholder='Search...' />
          <ConversationList>
            <Conversation name='Lilly' lastSenderName='Lilly' info='Yes i can do it for you'>
              <Avatar src={lillyIco} name='Lilly' />
            </Conversation>

            <Conversation name='Joe' lastSenderName='Joe' info='Yes i can do it for you'>
              <Avatar src={joeIco} name='Joe' status='dnd' />
            </Conversation>

            <Conversation name='Emily' lastSenderName='Emily' info='Yes i can do it for you' unreadCnt={3}>
              <Avatar src={emilyIco} name='Emily' status='available' />
            </Conversation>

            <Conversation name='Kai' lastSenderName='Kai' info='Yes i can do it for you' unreadDot>
              <Avatar src={kaiIco} name='Kai' status='unavailable' />
            </Conversation>

            <Conversation name='Akane' lastSenderName='Akane' info='Yes i can do it for you'>
              <Avatar src={akaneIco} name='Akane' status='eager' />
            </Conversation>

            <Conversation name='Eliot' lastSenderName='Eliot' info='Yes i can do it for you'>
              <Avatar src={eliotIco} name='Eliot' status='away' />
            </Conversation>

            <Conversation name='Zoe' lastSenderName='Zoe' info='Yes i can do it for you' active>
              <Avatar src={zoeIco} name='Zoe' status='dnd' />
            </Conversation>

            <Conversation name='Patrik' lastSenderName='Patrik' info='Yes i can do it for you'>
              <Avatar src={patrikIco} name='Patrik' status='invisible' />
            </Conversation>

          </ConversationList>
        </Sidebar>

        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar src={zoeIco} name='Zoe' />
            {/*<ConversationHeader.Content userName='Zoe' info='Active 10 mins ago' />*/}
            <ConversationHeader.Content userName='Zoe' />
            <ConversationHeader.Actions>
              {/*<VoiceCallButton />*/}
              {/*<VideoCallButton />*/}
              {/*<InfoButton />*/}
              <ArrowButton direction='down' onClick={() => dispatch({ type: TOGGLE_SHOW_CHAT })} />
            </ConversationHeader.Actions>
          </ConversationHeader>
          {/*<MessageList typingIndicator={<TypingIndicator content='Zoe is typing' />}>*/}
          <MessageList>
            {/*<MessageSeparator content='Saturday, 30 November 2019' />*/}

            <Message model={{
              message: 'Hello my friend',
              sentTime: '15 mins ago',
              sender: 'Zoe',
              direction: 'incoming',
              position: 'single',
            }}>
              <Avatar src={zoeIco} name='Zoe' />
            </Message>

            <Message model={{
              message: 'Hello my friend',
              sentTime: '15 mins ago',
              sender: 'Patrik',
              direction: 'outgoing',
              position: 'single',
            }} avatarSpacer />
            <Message model={{
              message: 'Hello my friend',
              sentTime: '15 mins ago',
              sender: 'Zoe',
              direction: 'incoming',
              position: 'first',
            }} avatarSpacer />
            <Message model={{
              message: 'Hello my friend',
              sentTime: '15 mins ago',
              sender: 'Zoe',
              direction: 'incoming',
              position: 'normal',
            }} avatarSpacer />
            <Message model={{
              message: 'Hello my friend',
              sentTime: '15 mins ago',
              sender: 'Zoe',
              direction: 'incoming',
              position: 'normal',
            }} avatarSpacer />
            <Message model={{
              message: 'Hello my friend',
              sentTime: '15 mins ago',
              sender: 'Zoe',
              direction: 'incoming',
              position: 'last',
            }}>
              <Avatar src={zoeIco} name='Zoe' />
            </Message>

            <Message model={{
              message: 'Hello my friend',
              sentTime: '15 mins ago',
              sender: 'Patrik',
              direction: 'outgoing',
              position: 'first',
            }} />
            <Message model={{
              message: 'Hello my friend',
              sentTime: '15 mins ago',
              sender: 'Patrik',
              direction: 'outgoing',
              position: 'normal',
            }} />
            <Message model={{
              message: 'Hello my friend',
              sentTime: '15 mins ago',
              sender: 'Patrik',
              direction: 'outgoing',
              position: 'normal',
            }} />
            <Message model={{
              message: 'Hello my friend',
              sentTime: '15 mins ago',
              sender: 'Patrik',
              direction: 'outgoing',
              position: 'last',
            }} />

            <Message model={{
              message: 'Hello my friend',
              sentTime: '15 mins ago',
              sender: 'Zoe',
              direction: 'incoming',
              position: 'first',
            }} avatarSpacer />
            <Message model={{
              message: 'Hello my friend',
              sentTime: '15 mins ago',
              sender: 'Zoe',
              direction: 'incoming',
              position: 'last',
            }}>
              <Avatar src={zoeIco} name='Zoe' />
            </Message>
          </MessageList>
          <MessageInput onAttachClick={onClickHandler} attachButton={true}
                        placeholder='Type message here' value={messageInputValue}
                        onChange={val => setMessageInputValue(val)} onSend={sendMessageHandler} />
        </ChatContainer>

        {/*<Sidebar position="right">*/}
        {/*  <ExpansionPanel open title="INFO">*/}
        {/*    <p>Lorem ipsum</p>*/}
        {/*    <p>Lorem ipsum</p>*/}
        {/*    <p>Lorem ipsum</p>*/}
        {/*    <p>Lorem ipsum</p>*/}
        {/*  </ExpansionPanel>*/}
        {/*  <ExpansionPanel title="LOCALIZATION">*/}
        {/*    <p>Lorem ipsum</p>*/}
        {/*    <p>Lorem ipsum</p>*/}
        {/*    <p>Lorem ipsum</p>*/}
        {/*    <p>Lorem ipsum</p>*/}
        {/*  </ExpansionPanel>*/}
        {/*  <ExpansionPanel title="MEDIA">*/}
        {/*    <p>Lorem ipsum</p>*/}
        {/*    <p>Lorem ipsum</p>*/}
        {/*    <p>Lorem ipsum</p>*/}
        {/*    <p>Lorem ipsum</p>*/}
        {/*  </ExpansionPanel>*/}
        {/*  <ExpansionPanel title="SURVEY">*/}
        {/*    <p>Lorem ipsum</p>*/}
        {/*    <p>Lorem ipsum</p>*/}
        {/*    <p>Lorem ipsum</p>*/}
        {/*    <p>Lorem ipsum</p>*/}
        {/*  </ExpansionPanel>*/}
        {/*  <ExpansionPanel title="OPTIONS">*/}
        {/*    <p>Lorem ipsum</p>*/}
        {/*    <p>Lorem ipsum</p>*/}
        {/*    <p>Lorem ipsum</p>*/}
        {/*    <p>Lorem ipsum</p>*/}
        {/*  </ExpansionPanel>*/}
        {/*</Sidebar>*/}
      </MainContainer>
    </div>
  )
}
