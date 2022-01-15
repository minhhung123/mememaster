import React, { useState } from 'react'
import { Row, Col, Upload, message, Typography, Input, Button, Tooltip } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const { Title } = Typography;
const { TextArea } = Input;

const formatNumber = (value) => {
  value += '';
  const list = value.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

const styles = {
  fileUpload: {
    margin: "15px",
    paddingRight: "15px",
    justifyContent: "center",
    alignItems: "center",
  },
  titleWrapper: {
    padding: "10px",
    display: "inline-block",
    width: "100%",
  },
  priceInput: {
    width: "100%",
    minWidth: "475px",
  },
  nameInput: {
    width: "100%",
    minWidth: "475px"
  },
  descriptionTextArea: {
    height: "120px",
    minWidth: "475px",
    width: "100%",
  }
}

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    console.log(info);
    const { status } = info.file;
    console.log(status);
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const NumericInput = (props) => {  
  const onChange = e => {
    console.log(e.target.value)
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(e.target.value) && reg.test(e.target.value)) || e.target.value === '' || e.target.value === '-') {
      props.onChange(e.target.value);
    }
  };

  const onBlur = () => {
    const { value, onChange } = props;
    let valueTemp = value;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\d+)/, '$1'));
    if (onBlur) {
      onBlur();
    }
  };

  const { value } = props;
  const title = value ? (
    <span className="numeric-input-title">{value !== '-' ? formatNumber(value) : '-'}</span>
  ) : (
    'Input a number'
  );
  return (
    <Tooltip
      trigger={['focus']}
      title={title}
      placement="topLeft"
      overlayClassName="numeric-input"
    >
      <Input
        size="large"
        value={value}
        onChange={onChange}
        placeholder="Input a number"
        maxLength={100}
        style={styles.priceInput}
      />
    </Tooltip>
  );
}

const MemeNFTCreate = () => {
  const [price, setPrice] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const onPriceChange = (e) => {
    setPrice(e);
  }
  const onNameChange = (e) => {
    setName(e.target.value);
  }
  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  }
  
  return (
    <div>
      <Title>Create your meme as an NFT</Title>
      <Row>
        <Col span={18} id="createFile">
          <Row>
            <div id="fileUpload" style={styles.titleWrapper}>
              <Title level={4}>Upload file</Title>
              <Col span={20} offset={2} style={styles.fileUpload}>
                <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                  </p>

                  </Dragger>    
              </Col>
            </div>
          </Row>
          
          <Row>
            <div id="price" style={styles.titleWrapper}>
              <Title level={4}>Price</Title>
              <Col span={24}>
                <NumericInput value={price} onChange={onPriceChange} />
              </Col>  
            </div>
          </Row>

          <Row>
            <div id="name" style={styles.titleWrapper}>
              <Title level={4}>Name</Title>
              <Col span={24}>
                <Input
                  size="large"
                  placeholder="Enter your name"
                  style={styles.nameInput} 
                  value={name} 
                  onChange={onNameChange} 
                />
              </Col>
            </div>
          </Row>

          <Row>
            <div id="description" style={styles.titleWrapper}>
              <Row id="descriptionTitle">
                <Col span={5}>
                  <Title level={4}>Description</Title>
                </Col>
                <Col span={19}>
                  <Title level={4} style={{ color: 'grey' }}>(Optional)</Title>
                </Col>
              </Row>
              <Row id="descriptionText">
                <TextArea 
                  showCount 
                  maxLength={150} 
                  value={description}
                  style={styles.descriptionTextArea}
                  onChange={onDescriptionChange} 
                />
              </Row>
            </div>  
          </Row>

          <Row>
            <div id="createButton" style={styles.titleWrapper}>
              <Button type="primary" shape="round" size="large">Create item</Button>
            </div>
          </Row>
          
        </Col>
        <Col span={6} id="previewFile">
          <Title level={4} style={styles.titleWrapper}>Preview</Title>
        </Col>
      </Row>
    </div>
  )
}

export default MemeNFTCreate
