import React from 'react'
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon
} from 'react-share'

import './Share.scss'

const ShareButton = (props) => {
  return (
    <div>
      <EmailShareButton className='share-button' url={props.shareUrl}>
        <EmailIcon size={32} round={true} />
      </EmailShareButton>
      <FacebookShareButton className='share-button' url={props.shareUrl}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <LinkedinShareButton className='share-button' url={props.shareUrl}>
        <LinkedinIcon size={32} round={true} />
      </LinkedinShareButton>
      <PinterestShareButton className='share-button' url={props.shareUrl}>
        <PinterestIcon size={32} round={true} />
      </PinterestShareButton>
      <RedditShareButton className='share-button' url={props.shareUrl}>
        <RedditIcon size={32} round={true} />
      </RedditShareButton>
      <TwitterShareButton className='share-button' url={props.shareUrl}>
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
      <WhatsappShareButton className='share-button' url={props.shareUrl}>
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>
    </div>
  )
}

export default ShareButton
