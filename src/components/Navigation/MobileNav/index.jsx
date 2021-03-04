import Section from '@htv/ui-kit/components/Section';
import Button from '@htv/ui-kit/components/Button';
import Text from '@htv/ui-kit/components/Text';
import { FaTimes } from 'react-icons/fa';
import classNames from 'classnames';
import toSvg from 'svgr.macro';
import { Link } from 'gatsby';
import NavigationBar from '../NavigationBar';
import navItems from '../navItems';
import { container, containerShown, items, item, text, footer } from './MobileNav.module.scss';
import { logoContainer, logo, button } from '../Navigation.module.scss';

const Logo = toSvg('../../../../node_modules/@htv/ui-kit/assets/logo.svg');

export default function MobileNav({ isShown, isMounted, setState }) {
    return isMounted ? (
        <div
            className={classNames(container, isShown && containerShown)}
        >
            <NavigationBar
                before={(
                    <Link
                        onClick={() => setState(false)}
                        className={logoContainer}
                        title='Link to homepage'
                        to='/'
                    >
                        <Logo className={logo} width='32' />
                    </Link>
                )}
                after={(
                    <Button
                        onClick={() => setState(false)}
                        className={button}
                        leftIcon={FaTimes}
                        color='white'
                        type='ghost'
                    >
                        Close
                    </Button>
                )}
            />
            <ul className={items}>
                {navItems.map(({ text: _text, ...props }, key, { length }) => {
                    if ((key + 1) === length) {
                        props.onBlur = () => setState(false);
                    }
                    return (
                        <li key={key}>
                            <Link
                                {...props}
                                onClick={() => setState(false)}
                                className={item}
                            >
                                <Text
                                    className={text}
                                    type='heading2'
                                    font='secondary'
                                    as='span'
                                >
                                    {_text}
                                </Text>
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <Section className={footer} as='div'>
                <Button disabled>
                    Coming Soon
                </Button>
            </Section>
        </div>
    ) : null;
}