import React, { useState } from 'react';
import { Button } from '../UIComponents/Buttons';
import { StyledLabeledInput } from '../UIComponents/StyledLabeledInput';
import styled from 'styled-components';

interface ConfigModel {
  // topic name
  name: number;
  // partition count
  partition: string;
  // replication factor
  replication: string;
}

const Container = styled.div`
  padding: 0.5rem;
  box-sizing: border-box;
`;

type Props = {
  [key: string]: any;
};

const TopicConfig: React.FC<Props> = (props: Props) => {
  const [config, setConfig] = useState<ConfigModel>({
    name: null,
    partition: '',
    replication: '',
  });
  const [error, setError] = useState<String>('');

  const updateConfig = (e) => {
    setConfig({
      ...config,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(config);
    fetch('/createTopics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: config.name,
        partition: config.partition,
        replication: config.replication,
      }),
    }).then((response) => console.log(response));
  };

  return (
    <Container>
      <StyledLabeledInput
        vertical
        name={'name'}
        labelText={'Topic Name'}
        toolTipText={'Provide a Topic Name (e.g. Test_Topic)'}
        onChange={updateConfig}
      />
      <StyledLabeledInput
        vertical
        name={'partition'}
        labelText={'Partition Count'}
        toolTipText={'Provide the desired # of Partitions (e.g. 5)'}
        onChange={updateConfig}
      />
      <StyledLabeledInput
        vertical
        name={'replication'}
        labelText={'Replication Factor'}
        toolTipText={'Provide the desired # of Replicas (e.g. 3)'}
        onChange={updateConfig}
      />
      <Button onClick={handleSubmit}>Create Topic</Button>
      {error.length > 0 && <div>{error}</div>}
    </Container>
  );
};

export default TopicConfig;
