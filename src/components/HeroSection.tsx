
import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Menu, X, BarChart3, TrendingUp, Shield, Zap, Activity, Star, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-hidden">
                <div
                    aria-hidden
                    className="z-[2] absolute inset-0 pointer-events-none isolate opacity-30 contain-strict hidden lg:block">
                    <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(160,84%,45%,.08)_0,hsla(160,84%,45%,.02)_50%,hsla(160,84%,45%,0)_80%)]" />
                    <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(160,84%,45%,.06)_0,hsla(160,84%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                    <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(160,84%,45%,.04)_0,hsla(160,84%,45%,.02)_80%,transparent_100%)]" />
                </div>
                <section>
                    <div className="relative pt-24 md:pt-36">
                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            delayChildren: 1,
                                        },
                                    },
                                },
                                item: {
                                    hidden: {
                                        opacity: 0,
                                        y: 20,
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            type: 'spring',
                                            bounce: 0.3,
                                            duration: 2,
                                        },
                                    },
                                },
                            }}
                            className="absolute inset-0 -z-20">
                            <img
                                src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=3276&h=4095&fit=crop&crop=center"
                                alt="crypto trading background"
                                className="absolute inset-x-0 top-56 -z-20 hidden lg:top-32 dark:block opacity-20"
                                width="3276"
                                height="4095"
                            />
                        </AnimatedGroup>
                        <div aria-hidden className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,hsl(var(--darker-blue))_75%)]" />
                        <div className="mx-auto max-w-7xl px-6">
                            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                                <AnimatedGroup variants={transitionVariants}>
                                    <Badge className="mx-auto flex w-fit items-center gap-2 rounded-full border border-mint/20 bg-darkest-blue/80 p-1 pl-4 shadow-lg backdrop-blur-sm">
                                        <span className="text-mint text-sm">🚀 AI-Powered Trading Revolution</span>
                                        <div className="bg-mint/20 group-hover:bg-mint/30 size-6 overflow-hidden rounded-full duration-500">
                                            <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out">
                                                <span className="flex size-6">
                                                    <ArrowRight className="m-auto size-3 text-mint" />
                                                </span>
                                            </div>
                                        </div>
                                    </Badge>
                        
                                    <h1 className="mt-8 max-w-4xl mx-auto text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem] font-bold text-mint leading-tight">
                                        Trade Smarter with
                                        <span className="block matrix-text animate-pulse-slow"> AI Intelligence</span>
                                    </h1>
                                    <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-mint/80">
                                        Professional-grade crypto trading platform with real-time analytics, AI-powered insights, whale tracking, and advanced portfolio management tools.
                                    </p>
                                </AnimatedGroup>

                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.05,
                                                    delayChildren: 0.75,
                                                },
                                            },
                                        },
                                        ...transitionVariants,
                                    }}
                                    className="mt-12 flex flex-col items-center justify-center gap-4 md:flex-row">
                                    <div className="bg-mint/10 rounded-[14px] border border-mint/20 p-0.5">
                                        <Button
                                            asChild
                                            size="lg"
                                            className="mint-button rounded-xl px-8 text-base border-2 border-mint">
                                            <Link to="/dashboard">
                                                <TrendingUp className="mr-2 h-5 w-5" />
                                                <span className="text-nowrap">Start Trading Now</span>
                                            </Link>
                                        </Button>
                                    </div>
                                    <Button
                                        asChild
                                        size="lg"
                                        variant="outline"
                                        className="h-12 rounded-xl px-8 border-mint/50 text-mint hover:bg-mint hover:text-darkest-blue">
                                        <Link to="#demo">
                                            <Play className="mr-2 h-5 w-5" />
                                            <span className="text-nowrap">Watch Demo</span>
                                        </Link>
                                    </Button>
                                </AnimatedGroup>

                                {/* Trading Stats */}
                                <AnimatedGroup
                                    variants={transitionVariants}
                                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
                                    <div className="text-center">
                                        <div className="flex justify-center mb-2 text-mint">
                                            <Activity className="h-6 w-6" />
                                        </div>
                                        <div className="text-3xl font-bold text-mint">$2.1B</div>
                                        <div className="text-mint/70">Trading Volume</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex justify-center mb-2 text-mint">
                                            <TrendingUp className="h-6 w-6" />
                                        </div>
                                        <div className="text-3xl font-bold text-mint">50K+</div>
                                        <div className="text-mint/70">Active Traders</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex justify-center mb-2 text-mint">
                                            <Shield className="h-6 w-6" />
                                        </div>
                                        <div className="text-3xl font-bold text-mint">99.9%</div>
                                        <div className="text-mint/70">Uptime</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex justify-center mb-2 text-mint">
                                            <Star className="h-6 w-6" />
                                        </div>
                                        <div className="text-3xl font-bold text-mint">94%</div>
                                        <div className="text-mint/70">Success Rate</div>
                                    </div>
                                </AnimatedGroup>
                            </div>
                        </div>

                        {/* Platform Preview */}
                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.75,
                                        },
                                    },
                                },
                                ...transitionVariants,
                            }}>
                            <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                                <div
                                    aria-hidden
                                    className="bg-gradient-to-b to-darker-blue absolute inset-0 z-10 from-transparent from-35%"
                                />
                                <div className="glass-effect-strong relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-mint/20 p-4 shadow-lg shadow-mint/10">
                                    <img
                                        className="bg-darkest-blue aspect-15/8 relative rounded-2xl border border-mint/10"
                                        src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=2700&h=1440&fit=crop&crop=center"
                                        alt="crypto trading platform dashboard"
                                        width="2700"
                                        height="1440"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-darkest-blue/50 to-transparent rounded-2xl" />
                                </div>
                            </div>
                        </AnimatedGroup>
                    </div>
                </section>

                {/* Trusted Partners Section */}
                <section className="bg-darkest-blue/50 pb-16 pt-16 md:pb-32">
                    <div className="group relative m-auto max-w-5xl px-6">
                        <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
                            <Link
                                to="#partners"
                                className="block text-sm duration-150 hover:opacity-75 text-mint">
                                <span>Trusted by Leading Exchanges</span>
                                <ArrowRight className="ml-1 inline-block size-3" />
                            </Link>
                        </div>
                        <div className="group-hover:blur-xs mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 sm:gap-x-16 sm:gap-y-14">
                            <div className="flex">
                                <div className="mx-auto h-8 w-20 bg-mint/20 rounded flex items-center justify-center text-mint text-xs font-bold">
                                    BINANCE
                                </div>
                            </div>
                            <div className="flex">
                                <div className="mx-auto h-8 w-20 bg-mint/20 rounded flex items-center justify-center text-mint text-xs font-bold">
                                    COINBASE
                                </div>
                            </div>
                            <div className="flex">
                                <div className="mx-auto h-8 w-20 bg-mint/20 rounded flex items-center justify-center text-mint text-xs font-bold">
                                    KRAKEN
                                </div>
                            </div>
                            <div className="flex">
                                <div className="mx-auto h-8 w-20 bg-mint/20 rounded flex items-center justify-center text-mint text-xs font-bold">
                                    UNISWAP
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

const menuItems = [
    { name: 'Features', href: '#features' },
    { name: 'Analytics', href: '#analytics' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
]

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-20 w-full px-2 group">
                <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'glass-effect-strong max-w-4xl rounded-2xl border border-mint/20 backdrop-blur-lg lg:px-5')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                to="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-mint-glow rounded-lg flex items-center justify-center">
                                    <BarChart3 className="h-5 w-5 text-darkest-blue" />
                                </div>
                                <span className="text-xl font-bold text-mint">CryptoTrader Pro</span>
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200 text-mint" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200 text-mint" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <a
                                            href={item.href}
                                            className="text-mint/80 hover:text-mint block duration-150">
                                            <span>{item.name}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="glass-effect group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-mint/20 p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <a
                                                href={item.href}
                                                className="text-mint/80 hover:text-mint block duration-150">
                                                <span>{item.name}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className={cn('border-mint/50 text-mint hover:bg-mint hover:text-darkest-blue', isScrolled && 'lg:hidden')}>
                                    <Link to="#login">
                                        <span>Login</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn('mint-button border-2 border-mint', isScrolled && 'lg:hidden')}>
                                    <Link to="/dashboard">
                                        <span>Get Started</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn('mint-button border-2 border-mint', isScrolled ? 'lg:inline-flex' : 'hidden')}>
                                    <Link to="/dashboard">
                                        <span>Start Trading</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
