import { extendTheme } from '@chakra-ui/react'

const colors = {
    sage: {
        50: '#f5f7f3',
        100: '#e8eee3',
        200: '#d1dcc7',
        300: '#b4c5a3',
        400: '#9CAF88', // Color principal Verde Sage
        500: '#7d9968',
        600: '#617a51',
        700: '#4f6142',
        800: '#425037',
        900: '#39442f',
    },
    vanilla: {
        50: '#fefffe',
        100: '#fdfcfa',
        200: '#fbf8f2',
        300: '#f8f3e7',
        400: '#F5F5DC', // Color acento Crema Vanilla
        500: '#f0ead1',
        600: '#e4d5b7',
        700: '#d4c097',
        800: '#c7ae82',
        900: '#b89968',
    }
}

const theme = extendTheme({
    // FORZAR MODO CLARO SIEMPRE
    config: {
        initialColorMode: 'light',
        useSystemColorMode: false, // ¡IMPORTANTE! Esto evita que use el tema del sistema
    },
    colors,
    fonts: {
        heading: 'Inter, system-ui, sans-serif',
        body: 'Inter, system-ui, sans-serif',
    },
    styles: {
        global: (props) => ({
            // Forzar fondo blanco siempre
            body: {
                bg: 'white !important', // !important para sobreescribir el tema del sistema
                color: 'gray.800 !important',
            },
            // Asegurar que el HTML también tenga fondo blanco
            html: {
                bg: 'white !important',
            }
        }),
    },
    components: {
        Button: {
            variants: {
                primary: {
                    bg: 'sage.400',
                    color: 'white',
                    _hover: {
                        bg: 'sage.500',
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                    },
                    _active: {
                        bg: 'sage.600',
                    },
                    borderRadius: 'full',
                    fontWeight: 'semibold',
                    px: 8,
                    py: 6,
                },
                secondary: {
                    bg: 'vanilla.400',
                    color: 'gray.700',
                    _hover: {
                        bg: 'vanilla.500',
                        transform: 'translateY(-2px)',
                        boxShadow: 'md',
                    },
                    borderRadius: 'full',
                    fontWeight: 'semibold',
                    px: 8,
                    py: 6,
                },
            },
        },
        Card: {
            baseStyle: {
                container: {
                    bg: 'white !important', // Forzar fondo blanco en cards
                    borderRadius: 'xl',
                    boxShadow: 'xl',
                    p: 6,
                },
            },
        },
        // Forzar colores en Menu para móvil
        Menu: {
            baseStyle: {
                list: {
                    bg: 'white !important',
                    borderColor: 'gray.200 !important',
                    color: 'gray.800 !important',
                },
                item: {
                    bg: 'white !important',
                    color: 'gray.800 !important',
                    _hover: {
                        bg: 'gray.50 !important',
                    },
                    _focus: {
                        bg: 'gray.50 !important',
                    }
                }
            }
        }
    },
})

export default theme