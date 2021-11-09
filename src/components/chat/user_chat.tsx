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
  CHAT_WITH_SHOP_SUCCESS, CHAT_WITH_USER_SUCCESS, INIT_USER_CONVERSATION_LIST, INIT_USER_MESSAGE_LIST,
  TOGGLE_SHOW_CHAT,
} from '../../redux/constants'
import { useDispatch, useSelector } from 'react-redux'

import { ChatType } from '../../constants/chat'

import { socket } from '../../socket/socket-client'
import chatReducer from '../../redux/reducers/chatReducer'
import { nanoid } from 'nanoid'
import { toast } from 'react-toastify'
import { instance } from '../../api/api'
import FlexBox from '@component/FlexBox'

interface ChatProps {
  width?: string;
  height: string;
  chatType: ChatType
}


export default function UserChat({ height = '600px', width = 'auto', chatType }: ChatProps) {

  const { socketClient: socket } = useSelector(state => state.chatReducer)


  const { user } = useSelector(state => state.chatReducer)

  const { user: userInfo } = useSelector(state => state.authReducer)

  let { currentHeaderInfo } = user

  currentHeaderInfo = currentHeaderInfo || {}

  const { id, name, type, avatarUrl } = currentHeaderInfo

  const dispatch = useDispatch()

  const [messageInputValue, setMessageInputValue] = useState('')

  const fileInput = useRef()

  const onClickHandler = () => {
    console.log(fileInput.current.click())
  }

  const inputChangeHandler = async event => {
    console.log(event.target.files)

    const formData = new FormData()
    formData.append('media', event.target.files[0])

    const res = await instance.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    socket.emit('CHAT_WITH_SHOP', {
        receiver: {
          id,
          type,
          avatarUrl,
          name,
        },
      content: '',
      attachment: {
        url: res.data,
      },
      type: 'IMAGE',
    }, res => {
      dispatch({
        type: CHAT_WITH_SHOP_SUCCESS,
        data: res,
      })
    })
  }


  const sendMessageHandler = () => {
    socket.emit('CHAT_WITH_SHOP', {
      receiver: {
        id,
        type,
        avatarUrl,
        name,
      },
      content: messageInputValue.trim(),
      attachment: null,
      type: 'TEXT',
    }, res => {
      console.log('socket res', res)
      dispatch({
        type: CHAT_WITH_SHOP_SUCCESS,
        data: res,
      })
    })
    setMessageInputValue('')
  }
  // check socket is dispatched or not

  const onClickConversationItem = async (currentHeaderInfo) => {
    dispatch({
      type: CHANGE_USER_CHAT_HEADER_INFO,
      currentHeaderInfo,
    })
    const currentMessageList = user.messageList[currentHeaderInfo.queryId]
    if (!currentMessageList) {
      try {
        const res = await instance.get(`/chat/users/messages?shopId=${currentHeaderInfo.id}`)
        dispatch({
          type: INIT_USER_MESSAGE_LIST,
          messages: res.data,
          shopId: currentHeaderInfo.id,
        })
      } catch (err) {
        toast.error('Error')
      }
    }
  }


  return (
    <div style={{
      height: height,
      position: 'relative',
      width: width,
    }}>
      <input onChange={inputChangeHandler} ref={fileInput} style={{ display: 'none' }} type='file' id='file-input' accept="image/*" />
      <MainContainer responsive>
        <Sidebar position={'left'} scrollable={false}>
          {/*<Search placeholder='Search...' />*/}
          <ConversationList>
            {/*{*/}
            {/*  user.conversationList.map(conversation => {*/}
            {/*    const conversationHeaderInfo = conversation.sender.type === 'SHOP' ? conversation.sender : conversation.receiver*/}
            {/*    return (*/}
            {/*      <Conversation*/}
            {/*        name={conversationHeaderInfo.name}*/}
            {/*        lastSenderName={conversationHeaderInfo.name} info={conversation.content}>*/}
            {/*        <Avatar src={conversationHeaderInfo.avatar} name= {conversationHeaderInfo.name}/>*/}
            {/*      </Conversation>*/}
            {/*    )*/}
            {/*  })*/}
            {/*}*/}


            {/*<Conversation name='Joe' lastSenderName='Joe' info='Yes i can do it for you'>*/}
            {/*  <Avatar src={joeIco} name='Joe' status='dnd' />*/}
            {/*</Conversation>*/}

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

            {
              user.conversationList.map((message) => {

                const targetInfo = message.sender.type === 'USER' ? message.receiver : message.sender

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


                return (
                  <Conversation key={nanoid()} onClick={() => onClickConversationItem(targetInfo)}
                                name={targetInfo.name}
                                lastSenderName={message.sender.name} info={info}
                                active={targetInfo?.queryId === user.currentHeaderInfo?.queryId}>
                    <Avatar src={targetInfo.avatarUrl} name={targetInfo.name} />
                  </Conversation>
                )
              })
            }
            {/*<Conversation name='Patrik' lastSenderName='Patrik' info='Yes i can do it for you'>*/}
            {/*  <Avatar src={patrikIco} name='Patrik' status='invisible' />*/}
            {/*</Conversation>*/}

          </ConversationList>
        </Sidebar>
        {
          user.currentHeaderInfo ? <ChatContainer>
            <ConversationHeader>
              <ConversationHeader.Back />
              <Avatar src={user.currentHeaderInfo?.avatarUrl} name={user.currentHeaderInfo?.name} />
              {/*<ConversationHeader.Content userName='Zoe' info='Active 10 mins ago' />*/}
              <ConversationHeader.Content userName={user.currentHeaderInfo?.name} />
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

              {/*<Message type='image' model={{*/}
              {/*  type: 'html',*/}
              {/*  direction: 'incoming',*/}
              {/*  payload: '<video width=\'300\' src=\'https://media.geeksforgeeks.org/wp-content/uploads/20190616234019/Canvas.move_.mp4\' controls ></video>',*/}
              {/*}}>*/}
              {/*  <Avatar src={joeIco} name='Joe' />*/}
              {/*</Message>*/}

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

              {
                user.messageList[user.currentHeaderInfo?.queryId]?.map(message => {

                  switch (message.messageType){
                    case 'TEXT' :
                      return (
                        <Message key={nanoid()} model={{
                          message: message.content,
                          // sentTime: '15 mins ago',
                          sender: message.sender.name,
                          // direction: 'incoming',
                          direction: message.sender.type === 'USER' ? 'outgoing' : 'incoming',
                          position: 'single',
                        }} avatarSpacer={message.sender.type === 'USER'}>
                          {message.sender.type === 'USER' ? null :
                            <Avatar src={message.sender.avatarUrl} name={message.sender.name} />}
                        </Message>
                      )
                    case 'IMAGE' :
                      return (
                        <Message key={nanoid()} model={{
                          // message: message.content,
                          // sentTime: '15 mins ago',
                          sender: message.sender.name,
                          // direction: 'incoming',
                          direction: message.sender.type === 'USER' ? 'outgoing' : 'incoming',
                          // position: 'single',
                        }} avatarSpacer={message.sender.type === 'USER'}>
                          {message.sender.type === 'USER' ? null :
                            <Avatar src={message.sender.avatarUrl} name={message.sender.name} />}
                          <Message.ImageContent src={message.attachment.url} width={300}   />
                        </Message>
                      )
                  }

                })
              }

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
          </ChatContainer> : <FlexBox flexDirection={'column'}>
            <p>When you start a new conversation</p>
            <ArrowButton direction='down' onClick={() => dispatch({ type: TOGGLE_SHOW_CHAT })} />
          </FlexBox>
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
