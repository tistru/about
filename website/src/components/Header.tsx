import { Link } from 'gatsby'
import ExternalLinkIcon from 'mdi-react/ExternalLinkIcon'
import * as React from 'react'

interface HeaderProps {
    isHome?: boolean
    isBlog?: boolean
    isProductPage?: boolean
    minimal?: boolean
    className?: string
}

export default class Header extends React.Component<HeaderProps, any> {
    constructor(props: HeaderProps) {
        super(props)

        this.toggle = this.toggle.bind(this)
        this.state = {
            isOpen: false,
            isTop: true,
        }
        this.onScroll = this.onScroll.bind(this)
    }
    public componentDidMount(): void {
        document.addEventListener('scroll', () => {
            const isTop = window.scrollY < 30
            if (isTop !== this.state.isTop) {
                this.onScroll(isTop)
            }
        })
    }
    public onScroll(isTop: string): void {
        this.setState({ isTop })
    }

    public toggle(): void {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }

    public render(): JSX.Element | null {
        return (
            <>
                <nav
                    className={`${
                        this.state.isTop ? '' : 'bg-white navborder'
                    } header navbar navbar-expand-md fixed-top pt-4 ${this.props.className || 'navbar-light'}`}
                >
                    <div className="container">
                        <Link className="navbar-brand header__logo" to="/">
                            <span role="img" aria-label="Sourcegraph - Universal code search">
                                {' '}
                            </span>
                        </Link>
                        {!this.props.minimal && (
                            <>
                                <button
                                    className="navbar-toggler"
                                    data-toggle="collapse"
                                    data-target="#navcol-1"
                                    onClick={this.toggle}
                                >
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="navbar-toggler-icon" />
                                </button>
                                <div
                                    className={`collapse navbar-collapse justify-content-end ${
                                        this.state.isOpen ? 'show' : ''
                                    }`}
                                    id="navcol-1"
                                >
                                    <ul className="nav navbar-nav d-flex w-100">
                                        <li className="header__nav-item nav-item" role="presentation">
                                            <Link
                                                className="header__nav-link nav-link"
                                                to="/customers"
                                                activeClassName="header__nav-link-active"
                                            >
                                                Customers
                                            </Link>
                                        </li>
                                        <li className="header__nav-item nav-item" role="presentation">
                                            <a
                                                className="header__nav-link nav-link"
                                                href="https://docs.sourcegraph.com"
                                            >
                                                Docs <ExternalLinkIcon className="icon-inline small ml-1" />
                                            </a>
                                        </li>
                                        <li className="header__nav-item nav-item" role="presentation">
                                            <Link
                                                className="header__nav-link nav-link"
                                                to="/pricing"
                                                activeClassName="header__nav-link-active"
                                            >
                                                Pricing
                                            </Link>
                                        </li>
                                        <li className="flex-1">&nbsp;</li>
                                        <li className="header__nav-item nav-item" role="presentation">
                                            <a
                                                className="header__nav-link nav-link"
                                                href="https://sourcegraph.com/sign-in"
                                                title="For public code only on Sourcegraph.com"
                                            >
                                                Sign in
                                            </a>
                                        </li>
                                        <li className="header__nav-item nav-item" role="presentation">
                                            <Link
                                                className="header__nav-link nav-link btn btn-outline-primary"
                                                to="/get-started"
                                                title="For public code only on Sourcegraph.com"
                                            >
                                                Get started
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                </nav>
            </>
        )
    }
}
