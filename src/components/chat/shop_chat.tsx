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
import {
  CHANGE_SHOP_CHAT_HEADER_INFO,
  CHANGE_USER_CHAT_HEADER_INFO,
  CHAT_WITH_SHOP, CHAT_WITH_SHOP_SUCCESS, CHAT_WITH_USER_SUCCESS,
  TOGGLE_SHOW_CHAT,
} from '../../redux/constants'
import { useDispatch, useSelector } from 'react-redux'

import { ChatType } from '../../constants/chat'

import { socket } from '../../socket/socket-client'
import chatReducer from '../../redux/reducers/chatReducer'

import { nanoid } from 'nanoid'


interface ChatProps {
  width?: string;
  height: string;
  chatType: ChatType
}


export default function ShopChat({ height = '600px', width = 'auto', chatType }: ChatProps) {

  const { shop } = useSelector(state => state.chatReducer)

  const { socketClient: socket } = useSelector(state => state.chatReducer)

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
    socket.emit('CHAT_WITH_USER', {
      receiver: {
        id: shop.currentHeaderInfo.id,
        type: 'USER',
        avatarUrl: shop.currentHeaderInfo.avatarUrl,
        name: shop.currentHeaderInfo.name,
        queryId: `USER_${shop.currentHeaderInfo.id}`,
      },
      content: messageInputValue,
      attachment: null,
      type: 'TEXT',
    }, res => {
      dispatch({
        type: CHAT_WITH_USER_SUCCESS,
        data: res,
      })
    })
    setMessageInputValue('')
  }
  // check socket is dispatched or not

  useEffect(() => {
    if (socket) {
      // socketClient.on('CHAT_WITH_SHOP', data => {
      //   dispatch({
      //     type: CHAT_WITH_SHOP,
      //     data,
      //   })
      // })
    }
  }, [socket])


  const lillyIco = 'https://cdn-icons-png.flaticon.com/512/147/147144.png'
  const joeIco = 'https://cdn1.vectorstock.com/i/1000x1000/31/95/user-sign-icon-person-symbol-human-avatar-vector-12693195.jpg'

  const emilyIco = 'https://toigingiuvedep.vn/wp-content/uploads/2021/05/hinh-anh-avatar-trang-dep-1.jpg'
  const kaiIco = 'https://allimages.sgp1.digitaloceanspaces.com/photographercomvn/2020/09/Tong-hop-hinh-anh-avatar-hai-huoc-nhin-la-bat.jpg'
  const akaneIco = 'https://i.ytimg.com/vi/8_Skx7B7MwQ/hqdefault.jpg'
  const eliotIco = 'https://meta.vn/Data/image/2021/08/17/con-vit-vang-tren-fb-la-gi-trend-anh-avatar-con-vit-vang-la-gi-3.jpg'

  const patrikIco = 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/4203820/original/cfef84cf8b38aaf4c40a5dadec562ce5fee498bf/create-a-flat-vector-avatar-of-you.jpg'
  const zoeIco = 'https://i2.wp.com/www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js.png?fit=438%2C408&ssl=1'


  const onClickConversationItem = (currentHeaderInfo) => {
    dispatch({
      type: CHANGE_SHOP_CHAT_HEADER_INFO,
      currentHeaderInfo,
    })
  }

  return (
    <div style={{
      height: height,
      position: 'relative',
      width: width,
    }}>
      <input onChange={inputChangeHandler} ref={fileInput} style={{ display: 'none' }} type='file' id='file-input' />
      <MainContainer responsive>
        <Sidebar position='left' scrollable={false}>
          {/*<Search placeholder='Search...' />*/}
          <ConversationList>
            {
              shop.conversationList.map(message => {

                console.log({ message })

                const targetInfo = message.sender.type === 'SHOP' ? message.receiver : message.sender

                let info = null
                switch (message.messageType) {
                  case 'TEXT'  :
                    info = message.content
                    break
                  case 'IMAGE' :
                    info = 'IMAGE'
                    break
                  case 'VIDEO' :
                    info = 'VIDEO'
                    break
                }

                return (<Conversation onClick={() => onClickConversationItem(targetInfo)} name={targetInfo.name}
                                      lastSenderName={message.sender.name} info={info}
                                      active={targetInfo?.queryId === shop.currentHeaderInfo?.queryId}>
                  <Avatar src={targetInfo.avatarUrl} name={targetInfo.name} />
                </Conversation>)
              })
            }


            {/*<Conversation name='Emily' lastSenderName='Emily' info='Yes i can do it for you' unreadCnt={3}>*/}
            {/*  <Avatar src={emilyIco} name='Emily' status='available' />*/}
            {/*</Conversation>*/}

            {/*<Conversation name='Kai' lastSenderName='Kai' info='Yes i can do it for you' unreadDot>*/}
            {/*  <Avatar src={kaiIco} name='Kai' status='unavailable' />*/}
            {/*</Conversation>*/}

            {/*<Conversation name='Akane' lastSenderName='Akane' info='Yes i can do it for you'>*/}
            {/*  <Avatar src={akaneIco} name='Akane' status='eager' />*/}
            {/*</Conversation>*/}

            {/*<Conversation name='Eliot' lastSenderName='Eliot' info='Yes i can do it for you'>*/}
            {/*  <Avatar src={eliotIco} name='Eliot' status='away' />*/}
            {/*</Conversation>*/}

            {/*<Conversation name='Zoe' lastSenderName='Zoe' info='Yes i can do it for you' active>*/}
            {/*  <Avatar src={zoeIco} name='Zoe' status='dnd' />*/}
            {/*</Conversation>*/}

            {/*<Conversation name='Patrik' lastSenderName='Patrik' info='Yes i can do it for you'>*/}
            {/*  <Avatar src={patrikIco} name='Patrik' status='invisible' />*/}
            {/*</Conversation>*/}

          </ConversationList>
        </Sidebar>

        {
          shop.currentHeaderInfo ? <ChatContainer>
            <ConversationHeader>
              <ConversationHeader.Back />
              <Avatar src={shop.currentHeaderInfo?.avatarUrl} name={shop.currentHeaderInfo?.name} />
              {/*<ConversationHeader.Content userName='Zoe' info='Active 10 mins ago' />*/}
              <ConversationHeader.Content userName={shop.currentHeaderInfo?.name} />
              <ConversationHeader.Actions>
                {/*<VoiceCallButton />*/}
                {/*<VideoCallButton />*/}
                {/*<InfoButton />*/}
              </ConversationHeader.Actions>
            </ConversationHeader>
            {/*<MessageList typingIndicator={<TypingIndicator content='Zoe is typing' />}>*/}
            <MessageList>
              {/*<MessageSeparator content='Saturday, 30 November 2019' />*/}
              {
                shop.messageList[shop.currentHeaderInfo?.queryId]?.map(message => {
                  console.log({ message })
                  return (
                    <Message key={nanoid()} model={{
                      message: message.content,
                      // sentTime: '15 mins ago',
                      sender: message.sender.name,
                      direction: message.sender.type === 'SHOP' ?  'outgoing' : 'incoming',
                      position: 'single',
                    }} avatarSpacer={message.sender.type === 'SHOP'}>
                      {message.sender.type === 'SHOP' ? null :  <Avatar src={message.sender.avatarUrl} name={message.sender.name} /> }
                    </Message>
                  )
                })
              }


              {/*<Message model={{*/}
              {/*  message: 'Hello my friend',*/}
              {/*  sentTime: '15 mins ago',*/}
              {/*  sender: 'Patrik',*/}
              {/*  direction: 'outgoing',*/}
              {/*  position: 'single',*/}
              {/*}} avatarSpacer />*/}
              {/*<Message model={{*/}
              {/*  message: 'Hello my friend',*/}
              {/*  sentTime: '15 mins ago',*/}
              {/*  sender: 'Zoe',*/}
              {/*  direction: 'incoming',*/}
              {/*  position: 'first',*/}
              {/*}} avatarSpacer />*/}
              {/*<Message model={{*/}
              {/*  message: 'Hello my friend',*/}
              {/*  sentTime: '15 mins ago',*/}
              {/*  sender: 'Zoe',*/}
              {/*  direction: 'incoming',*/}
              {/*  position: 'normal',*/}
              {/*}} avatarSpacer />*/}
              {/*<Message model={{*/}
              {/*  message: 'Hello my friend',*/}
              {/*  sentTime: '15 mins ago',*/}
              {/*  sender: 'Zoe',*/}
              {/*  direction: 'incoming',*/}
              {/*  position: 'normal',*/}
              {/*}} avatarSpacer />*/}
              {/*<Message model={{*/}
              {/*  message: 'Hello my friend',*/}
              {/*  sentTime: '15 mins ago',*/}
              {/*  sender: 'Zoe',*/}
              {/*  direction: 'incoming',*/}
              {/*  position: 'last',*/}
              {/*}}>*/}
              {/*  <Avatar src={zoeIco} name='Zoe' />*/}
              {/*</Message>*/}

              {/*<Message model={{*/}
              {/*  message: 'Hello my friend',*/}
              {/*  sentTime: '15 mins ago',*/}
              {/*  sender: 'Patrik',*/}
              {/*  direction: 'outgoing',*/}
              {/*  position: 'first',*/}
              {/*}} />*/}
              {/*<Message model={{*/}
              {/*  message: 'Hello my friend',*/}
              {/*  sentTime: '15 mins ago',*/}
              {/*  sender: 'Patrik',*/}
              {/*  direction: 'outgoing',*/}
              {/*  position: 'normal',*/}
              {/*}} />*/}
              {/*<Message model={{*/}
              {/*  message: 'Hello my friend',*/}
              {/*  sentTime: '15 mins ago',*/}
              {/*  sender: 'Patrik',*/}
              {/*  direction: 'outgoing',*/}
              {/*  position: 'normal',*/}
              {/*}} />*/}
              {/*<Message model={{*/}
              {/*  message: 'Hello my friend',*/}
              {/*  sentTime: '15 mins ago',*/}
              {/*  sender: 'Patrik',*/}
              {/*  direction: 'outgoing',*/}
              {/*  position: 'last',*/}
              {/*}} />*/}

              {/*<Message model={{*/}
              {/*  message: 'Hello my friend',*/}
              {/*  sentTime: '15 mins ago',*/}
              {/*  sender: 'Zoe',*/}
              {/*  direction: 'incoming',*/}
              {/*  position: 'first',*/}
              {/*}} avatarSpacer />*/}
              {/*<Message model={{*/}
              {/*  message: 'Hello my friend',*/}
              {/*  sentTime: '15 mins ago',*/}
              {/*  sender: 'Zoe',*/}
              {/*  direction: 'incoming',*/}
              {/*  position: 'last',*/}
              {/*}}>*/}
              {/*  <Avatar src={zoeIco} name='Zoe' />*/}
              {/*</Message>*/}
            </MessageList>
            <MessageInput onAttachClick={onClickHandler} attachButton={true}
                          placeholder='Type message here' value={messageInputValue}
                          onChange={val => setMessageInputValue(val)} onSend={sendMessageHandler} />
          </ChatContainer> : 'EMPTY'
        }


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
