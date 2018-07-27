// @flow

import _ from 'lodash';
import React from 'react';
import cn from 'classnames';

const Card = ({ media_type, type, name, preview, onClickHandlers }) => {
  const { handleDownload, handleDirectory } = onClickHandlers;
  const Img = () => {
    const className = cn({
      icon: true,
      'icon-folder-close': type === 'dir',
      'icon-audio': media_type === 'audio',
      'icon-video': media_type === 'video',
    });

    if (type === 'dir') {
      return (
        <div>
          <a onClick={handleDirectory}>
            <span className={className}></span>
          </a>
        </div>
      );
    } else if (media_type === 'image') {
      return (
        <img src={preview} alt={name} />
      );
    }

    return (
      <div>
        <span className={className}></span>
      </div>
    );
  };

  return (
    <div className="card text-center">
      <div className="card-image">
        <Img className="card-img-top" />
      </div>
      <div className="card-body">
        <p className="card-title">{name}</p>
        {(type === 'dir') ? null :
          <a href="#" className="btn btn-primary btn-sm"
            onClick={handleDownload}>Скачать</a>}
        <a
          href="#"
          className="btn btn-danger btn-sm"
          onClick={handleDownload}>Удалить</a>
      </div>
    </div>
  );
};

export default class DiskItems extends React.Component {
  static defaultProps = {
    diskItems: [],
  };

  handleDownload = fileUrl => (e) => {
    e.preventDefault();
    window.open(fileUrl, '_self');
  }

  handleDirectory = pathUrl => (e) => {
    e.preventDefault();
    this.props.fetchDiskItems(pathUrl);
  }

  renderItems(items, isRequested) {
    if (items.length === 0) {
      return null;
    }

    const className = cn({
      listing__items: true,
      hidden: isRequested,
    });

    return (
      <div className={className}>
        {items.map((itemData, index) => {
          const props = {
            type: itemData.type,
            media_type: itemData.media_type,
            name: itemData.name,
            preview: itemData.preview,
            onClickHandlers: {
              handleDownload: this.handleDownload(itemData.file),
              handleDirectory: this.handleDirectory(itemData.path),
            }
          };

          return (
            <div key={`cardCol-${_.uniqueId()}`} className="listing-item">
              <Card { ...props } />
            </div>
          );
        })}
      </div>
    );
  }

  renderPreloader(isRequested) {
    const wrapperClassName = cn({
      'listing__preloader-wrapper': true,
      active: isRequested,
    });

    return (
      <div className={wrapperClassName}>
        <div className="preloader"></div>
      </div>
    );
  }

  render() {
    const { diskItems, fetchingState } = this.props;
    const isRequested = fetchingState === 'requested';

    return (
      <div className="listing">
        {this.renderItems(diskItems, isRequested)}
        {this.renderPreloader(isRequested)}
      </div>
    );
  }
};
