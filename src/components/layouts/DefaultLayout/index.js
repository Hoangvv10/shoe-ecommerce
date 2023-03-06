import Footer from '../Footer';
import Header from '../Header';

function DefaultLayout({ children }) {
    return (
        <>
            <div
                style={{
                    margin: '0 60px',
                }}
            >
                <Header />
                <div
                    style={{
                        marginTop: '180px',
                    }}
                >
                    {children}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default DefaultLayout;
