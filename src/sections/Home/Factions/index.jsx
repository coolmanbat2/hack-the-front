import { ReactComponent as Logo } from '@htv/ui-kit/assets/logo.svg';
import Section from '@htv/ui-kit/components/Section';
import Button from '@htv/ui-kit/components/Button';
import Text from '@htv/ui-kit/components/Text';
import Card from '@htv/ui-kit/components/Card';
import classNames from 'classnames';
import { useEffect, useState, useRef, forwardRef } from 'react';
import { factions, questions } from './data';
import * as styles from './Factions.module.scss';

function FactionAction({ data, onClick }) {
  const FactionIcon = data.image;
  return (
    <li>
      <Card
        onClick={onClick}
        className={styles.button}
        as='button'
        type='flat'
      >
        <FactionIcon />
        <Text
          type='body1'
          as='p'
          align='center'
          transform='uppercase'
        >
          {data.name}
        </Text>
      </Card>
    </li>
  );
}

function _FactionContent({ data, selected, onClick }, ref) {
  const FactionIcon = data.image;
  return (
    <div className={classNames(
      !selected && styles.content__hide,
      styles.content,
    )} ref={ref}>
      <div className={styles.content_header}>
        <FactionIcon/>
        <Text
          type='body1'
          as='p'
          align='center'
          transform='uppercase'
        >
          {data.name}
        </Text>
      </div>
      <div>
        <Text type='heading2' weight='normal' as='h3' transform='uppercase'>
          {data.name} Faction
        </Text>
        <Text className={styles.content_text} lineHeight='relaxed' type='body2' as='p'>
          {data.content}
        </Text>
        <Button onClick={onClick}>
          Back to list
        </Button>
      </div>
    </div>
  );
}
const FactionContent = forwardRef(_FactionContent);

export default function Factions() {
  const [ selected, setSelected ] = useState();
  const [ height, setHeight ] = useState(0);
  const contentRef = useRef([]);
  const actionsRef = useRef();

  useEffect(() => {
    let mounted = true;
    if (selected === undefined) {
      const handler = () => {
        if (mounted) {
          setHeight(actionsRef.current.offsetHeight);
        }
      };
      handler();

      window.addEventListener(`resize`, handler, { passive: true });
      return () => {
        mounted = false;
        window.removeEventListener(`resize`, handler, { passive: true });
      };
    } else {
      const handler = () => {
        if (mounted) {
          setHeight(contentRef.current[selected].offsetHeight);
        }
      };
      handler();

      window.addEventListener(`resize`, handler, { passive: true });
      return () => {
        mounted = false;
        window.removeEventListener(`resize`, handler, { passive: true });
      };
    }
  }, [ selected ]);

  return (
    <Section id='factions' backgroundColor='charcoal'>
      <div className={styles.header}>
        <Text
          className={styles.heading}
          type='heading2'
          transform='uppercase'
          weight='normal'
        >
          The Factions
        </Text>
        <Text type='heading2' color='lime' as='span'>
          //Click to view details
        </Text>
      </div>
      <div style={{ '--height': `${height}px` }} className={styles.frame}>
        <ul ref={actionsRef} className={classNames(
          selected !== undefined && styles.items__hide,
          styles.items,
        )}>
          {factions.map((data, key) => {
            return (
              <FactionAction
                onClick={() => {
                  setSelected(key);
                }}
                data={data}
                key={key}
              />
            );
          })}
        </ul>
        {factions.map((data, key) => {
          return (
            <FactionContent
              onClick={() => {
                setSelected();
              }}
              ref={el => contentRef.current[key] = el}
              selected={selected === key}
              data={data}
              key={key}
            />
          )
        })}
      </div>
      <Text type='heading2' style={{ display: 'none' }}>
        Questions about Factions
      </Text>
      {questions.map(({ title, content }) => (
        <div key={title}>
          <Text
            type='heading2'
            as='h3'
            transform='uppercase'
          >
            &gt; {title}
          </Text>
          <Text className={styles.question_body} type='body1'>{content}</Text>
        </div>
      ))}
    </Section>
  );
}
