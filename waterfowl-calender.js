// Waterfowl Calendar Component - Plain JavaScript (no JSX)
(function() {
  const { useState } = React;

  const WaterfowlCalendar = () => {
    const [selectedYear, setSelectedYear] = useState('2025-26');
    const [selectedSeason, setSelectedSeason] = useState('duck');

    // Icon components as plain JavaScript
    const Calendar = () => React.createElement('svg', {
      width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none',
      stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round'
    },
      React.createElement('rect', { x: 3, y: 4, width: 18, height: 18, rx: 2, ry: 2 }),
      React.createElement('line', { x1: 16, y1: 2, x2: 16, y2: 6 }),
      React.createElement('line', { x1: 8, y1: 2, x2: 8, y2: 6 }),
      React.createElement('line', { x1: 3, y1: 10, x2: 21, y2: 10 })
    );

    const Clock = () => React.createElement('svg', {
      width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none',
      stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round'
    },
      React.createElement('circle', { cx: 12, cy: 12, r: 10 }),
      React.createElement('polyline', { points: '12 6 12 12 16 14' })
    );

    const Info = () => React.createElement('svg', {
      width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none',
      stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round'
    },
      React.createElement('circle', { cx: 12, cy: 12, r: 10 }),
      React.createElement('line', { x1: 12, y1: 16, x2: 12, y2: 12 }),
      React.createElement('line', { x1: 12, y1: 8, x2: 12.01, y2: 8 })
    );

    const Target = () => React.createElement('svg', {
      width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none',
      stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round'
    },
      React.createElement('circle', { cx: 12, cy: 12, r: 10 }),
      React.createElement('circle', { cx: 12, cy: 12, r: 6 }),
      React.createElement('circle', { cx: 12, cy: 12, r: 2 })
    );

    const seasonData = {
      '2025-26': {
        year: '2025-26',
        status: 'active',
        seasons: {
          duck: {
            name: 'Duck, Coot & Merganser',
            icon: '🦆',
            dates: [
              { period: 'Split 1', start: 'Nov 22, 2025', end: 'Dec 1, 2025' },
              { period: 'Split 2', start: 'Dec 10, 2025', end: 'Dec 23, 2025' },
              { period: 'Split 3', start: 'Dec 27, 2025', end: 'Jan 31, 2026' }
            ],
            limits: [
              '6 daily bag limit',
              'Max 4 mallards (2 hens)',
              '3 wood ducks, 3 pintails',
              '1 scaup, 2 redheads',
              '2 canvasbacks, 2 black ducks',
              '1 mottled duck'
            ],
            hours: '30 min before sunrise to noon',
            note: 'All-day hunting allowed Jan 31, 2026'
          },
          teal: {
            name: 'Early Teal Season',
            icon: '🦆',
            dates: [
              { period: 'Early Season', start: 'Sep 20, 2025', end: 'Sep 28, 2025' }
            ],
            limits: [
              '6 teal daily (all species)',
              'Possession limit: 18'
            ],
            hours: '30 min before sunrise to sunset',
            note: 'Blue-winged, green-winged, cinnamon teal'
          },
          canada: {
            name: 'Canada Goose',
            icon: '🪿',
            dates: [
              { period: 'Early', start: 'Sep 1, 2025', end: 'Oct 15, 2025' },
              { period: 'Split 1', start: 'Nov 22, 2025', end: 'Dec 1, 2025' },
              { period: 'Split 2', start: 'Dec 10, 2025', end: 'Dec 23, 2025' },
              { period: 'Split 3', start: 'Dec 27, 2025', end: 'Jan 31, 2026' }
            ],
            limits: [
              '5 daily bag limit',
              'Possession limit: 15'
            ],
            hours: '30 min before sunrise to sunset',
            note: 'Early season runs September-October'
          },
          speck: {
            name: 'White-fronted Goose (Specks)',
            icon: '🪿',
            dates: [
              { period: 'Split 1', start: 'Oct 25, 2025', end: 'Nov 2, 2025' },
              { period: 'Split 2', start: 'Nov 22, 2025', end: 'Dec 1, 2025' },
              { period: 'Split 3', start: 'Dec 10, 2025', end: 'Dec 23, 2025' },
              { period: 'Split 4', start: 'Dec 27, 2025', end: 'Jan 31, 2026' }
            ],
            limits: [
              '2 daily bag limit',
              'Possession limit: 6'
            ],
            hours: '30 min before sunrise to sunset',
            note: 'Reduced from 3 to 2 daily for 2025-26'
          },
          snow: {
            name: "Snow, Blue & Ross's Goose",
            icon: '🪿',
            dates: [
              { period: 'Split 1', start: 'Oct 25, 2025', end: 'Nov 2, 2025' },
              { period: 'Split 2', start: 'Nov 22, 2025', end: 'Dec 1, 2025' },
              { period: 'Split 3', start: 'Dec 10, 2025', end: 'Dec 23, 2025' },
              { period: 'Split 4', start: 'Dec 27, 2025', end: 'Jan 31, 2026' }
            ],
            limits: [
              '20 daily bag limit',
              'No possession limit'
            ],
            hours: '30 min before sunrise to sunset',
            note: 'Light Goose Conservation Order: Feb 1-6, Feb 9-Apr 25, 2026'
          },
          youth: {
            name: 'Youth & Veteran Hunts',
            icon: '👥',
            dates: [
              { period: 'Youth Hunt', start: 'Feb 7, 2026', end: 'Feb 8, 2026' },
              { period: 'Military/Veteran', start: 'Feb 7, 2026', end: 'Feb 8, 2026' }
            ],
            limits: [
              'Youth: Ages 15 and under',
              'Same bag limits as regular season',
              'No shell limit on WMAs',
              'Sunrise to sunset hunting'
            ],
            hours: '30 min before sunrise to sunset',
            note: 'Youth must be with mentor 21+ if no hunter ed'
          }
        }
      },
      '2026-27': {
        year: '2026-27',
        status: 'upcoming',
        announcementDate: 'Late Spring 2026',
        seasons: {
          duck: {
            name: 'Duck, Coot & Merganser',
            icon: '🦆',
            dates: [
              { period: 'Split 1', start: 'TBA', end: 'TBA' },
              { period: 'Split 2', start: 'TBA', end: 'TBA' },
              { period: 'Split 3', start: 'TBA', end: 'TBA' }
            ],
            limits: [
              'Bag limits to be announced',
              'Check AGFC for updates'
            ],
            hours: 'To be announced',
            note: 'Season dates typically announced in late April/May'
          },
          teal: {
            name: 'Early Teal Season',
            icon: '🦆',
            dates: [
              { period: 'Early Season', start: 'TBA', end: 'TBA' }
            ],
            limits: [
              'Bag limits to be announced',
              'Check AGFC for updates'
            ],
            hours: 'To be announced',
            note: 'Typically runs mid-September'
          },
          canada: {
            name: 'Canada Goose',
            icon: '🪿',
            dates: [
              { period: 'Early Season', start: 'TBA', end: 'TBA' },
              { period: 'Regular Season', start: 'TBA', end: 'TBA' }
            ],
            limits: [
              'Bag limits to be announced',
              'Check AGFC for updates'
            ],
            hours: 'To be announced',
            note: 'Season dates typically announced in late April/May'
          },
          speck: {
            name: 'White-fronted Goose (Specks)',
            icon: '🪿',
            dates: [
              { period: 'Regular Season', start: 'TBA', end: 'TBA' }
            ],
            limits: [
              'Bag limits to be announced',
              'Check AGFC for updates'
            ],
            hours: 'To be announced',
            note: 'Season dates typically announced in late April/May'
          },
          snow: {
            name: "Snow, Blue & Ross's Goose",
            icon: '🪿',
            dates: [
              { period: 'Regular Season', start: 'TBA', end: 'TBA' }
            ],
            limits: [
              'Bag limits to be announced',
              'Check AGFC for updates'
            ],
            hours: 'To be announced',
            note: 'Conservation Order dates to be announced'
          },
          youth: {
            name: 'Youth & Veteran Hunts',
            icon: '👥',
            dates: [
              { period: 'Youth Hunt', start: 'TBA', end: 'TBA' },
              { period: 'Military/Veteran', start: 'TBA', end: 'TBA' }
            ],
            limits: [
              'Bag limits to be announced',
              'Check AGFC for updates'
            ],
            hours: 'To be announced',
            note: 'Season dates typically announced in late April/May'
          }
        }
      }
    };

    const currentYearData = seasonData[selectedYear];
    const seasons = currentYearData.seasons;
    const seasonKeys = Object.keys(seasons);
    const currentSeason = seasons[selectedSeason];

    // Styles
    const styles = `
      @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&family=Oswald:wght@400;600;700&display=swap');
      
      @keyframes fadeSlideIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes pulseGlow {
        0%, 100% {
          box-shadow: 0 0 20px rgba(218, 165, 32, 0.3);
        }
        50% {
          box-shadow: 0 0 30px rgba(218, 165, 32, 0.6);
        }
      }
      
      .season-card {
        animation: fadeSlideIn 0.6s ease-out;
      }
      
      .active-season {
        animation: pulseGlow 2s ease-in-out infinite;
      }
    `;

    return React.createElement('div', {
      style: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2d3436 0%, #4a5759 100%)',
        padding: '60px 20px',
        fontFamily: "'Merriweather', 'Georgia', serif"
      }
    },
      React.createElement('style', {}, styles),
      React.createElement('div', { style: { maxWidth: '1400px', margin: '0 auto' } },
        // Header
        React.createElement('div', {
          style: {
            textAlign: 'center',
            marginBottom: '60px',
            animation: 'fadeSlideIn 0.8s ease-out'
          }
        },
          React.createElement('div', {
            style: {
              display: 'inline-flex',
              alignItems: 'center',
              gap: '15px',
              marginBottom: '20px',
              padding: '15px 30px',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '50px',
              border: '2px solid rgba(218, 165, 32, 0.3)'
            }
          },
            React.createElement(Calendar),
            React.createElement('h1', {
              style: {
                fontFamily: "'Oswald', sans-serif",
                fontSize: '42px',
                fontWeight: '700',
                margin: 0,
                color: '#f5f5f5',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }
            }, 'Arkansas Waterfowl Seasons')
          ),
          React.createElement('p', {
            style: {
              fontSize: '18px',
              color: '#c9d1d9',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }
          }, 'Current & Upcoming Season Dates & Regulations')
        ),

        // Year Selector
        React.createElement('div', {
          style: {
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '40px',
            animation: 'fadeSlideIn 0.9s ease-out'
          }
        },
          Object.keys(seasonData).map((year) =>
            React.createElement('button', {
              key: year,
              onClick: () => {
                setSelectedYear(year);
                setSelectedSeason('duck');
              },
              style: {
                padding: '20px 50px',
                background: selectedYear === year
                  ? 'linear-gradient(135deg, #daa520 0%, #b8860b 100%)'
                  : 'rgba(0,0,0,0.4)',
                border: selectedYear === year
                  ? '3px solid #ffd700'
                  : '2px solid rgba(218, 165, 32, 0.3)',
                borderRadius: '15px',
                color: selectedYear === year ? '#000' : '#daa520',
                fontFamily: "'Oswald', sans-serif",
                fontSize: '24px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                boxShadow: selectedYear === year
                  ? '0 10px 30px rgba(218, 165, 32, 0.5)'
                  : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              },
              className: selectedYear === year ? 'active-season' : '',
              onMouseEnter: (e) => {
                if (selectedYear !== year) {
                  e.currentTarget.style.background = 'rgba(218, 165, 32, 0.2)';
                  e.currentTarget.style.borderColor = '#daa520';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }
              },
              onMouseLeave: (e) => {
                if (selectedYear !== year) {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.4)';
                  e.currentTarget.style.borderColor = 'rgba(218, 165, 32, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }
            },
              seasonData[year].status === 'active' && React.createElement(Calendar),
              seasonData[year].status === 'upcoming' && React.createElement(Clock),
              year,
              seasonData[year].status === 'upcoming' && React.createElement('span', {
                style: {
                  fontSize: '12px',
                  padding: '4px 10px',
                  background: 'rgba(255, 152, 0, 0.3)',
                  borderRadius: '20px',
                  fontWeight: '600',
                  letterSpacing: '1px'
                }
              }, 'COMING SOON')
            )
          )
        ),

        // Upcoming Season Notice
        currentYearData.status === 'upcoming' && React.createElement('div', {
          style: {
            marginBottom: '40px',
            padding: '25px 35px',
            background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.2) 0%, rgba(218, 165, 32, 0.2) 100%)',
            borderRadius: '15px',
            border: '3px solid #ff9800',
            textAlign: 'center',
            animation: 'fadeSlideIn 1s ease-out'
          }
        },
          React.createElement('h3', {
            style: {
              fontFamily: "'Oswald', sans-serif",
              fontSize: '26px',
              color: '#ffa726',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              textTransform: 'uppercase'
            }
          },
            React.createElement(Clock),
            '2026-27 Season Dates Not Yet Available'
          ),
          React.createElement('p', {
            style: {
              fontSize: '18px',
              color: '#ffb74d',
              margin: 0,
              lineHeight: '1.6'
            }
          },
            'Season dates typically announced by Arkansas Game & Fish Commission in ',
            React.createElement('strong', {}, currentYearData.announcementDate),
            '.',
            React.createElement('br'),
            'Check back or follow AGFC announcements at ',
            React.createElement('a', {
              href: 'https://www.agfc.com',
              style: { color: '#ffd700', textDecoration: 'none', fontWeight: '700' }
            }, 'www.agfc.com')
          )
        ),

        // Season Selector
        React.createElement('div', {
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '15px',
            marginBottom: '50px',
            animation: 'fadeSlideIn 1s ease-out'
          }
        },
          seasonKeys.map((key, idx) =>
            React.createElement('button', {
              key: key,
              onClick: () => setSelectedSeason(key),
              style: {
                padding: '20px 15px',
                background: selectedSeason === key
                  ? 'linear-gradient(135deg, #8b7355 0%, #6b5344 100%)'
                  : 'rgba(0,0,0,0.3)',
                border: selectedSeason === key
                  ? '3px solid #daa520'
                  : '2px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: selectedSeason === key ? '#fff' : '#c9d1d9',
                fontFamily: "'Oswald', sans-serif",
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                boxShadow: selectedSeason === key
                  ? '0 8px 20px rgba(218, 165, 32, 0.3)'
                  : 'none',
                animationDelay: `${idx * 0.1}s`
              },
              className: selectedSeason === key ? 'active-season' : '',
              onMouseEnter: (e) => {
                if (selectedSeason !== key) {
                  e.currentTarget.style.background = 'rgba(139, 115, 85, 0.3)';
                  e.currentTarget.style.borderColor = '#daa520';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              },
              onMouseLeave: (e) => {
                if (selectedSeason !== key) {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.3)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }
            },
              React.createElement('div', {
                style: { fontSize: '28px', marginBottom: '5px' }
              }, seasons[key].icon),
              seasons[key].name
            )
          )
        ),

        // Main Content Card
        React.createElement('div', {
          style: {
            background: 'linear-gradient(135deg, rgba(139, 115, 85, 0.15) 0%, rgba(107, 83, 68, 0.15) 100%)',
            borderRadius: '20px',
            padding: '50px',
            border: '3px solid rgba(218, 165, 32, 0.3)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(10px)'
          },
          className: 'season-card'
        },
          // Season Header
          React.createElement('div', {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '40px',
              paddingBottom: '30px',
              borderBottom: '2px solid rgba(218, 165, 32, 0.3)'
            }
          },
            React.createElement('div', {
              style: {
                fontSize: '60px',
                background: 'rgba(0,0,0,0.3)',
                padding: '20px',
                borderRadius: '15px',
                border: '2px solid #daa520'
              }
            }, currentSeason.icon),
            React.createElement('div', {},
              React.createElement('h2', {
                style: {
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: '36px',
                  fontWeight: '700',
                  margin: '0 0 10px 0',
                  color: '#fff',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }
              }, currentSeason.name),
              React.createElement('p', {
                style: {
                  fontSize: '16px',
                  color: '#daa520',
                  margin: 0,
                  fontWeight: '600'
                }
              }, 'Season Dates & Information')
            )
          ),

          // Season Dates
          React.createElement('div', { style: { marginBottom: '40px' } },
            React.createElement('h3', {
              style: {
                fontFamily: "'Oswald', sans-serif",
                fontSize: '24px',
                color: '#daa520',
                marginBottom: '25px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }
            },
              React.createElement(Calendar),
              'Season Dates'
            ),
            React.createElement('div', { style: { display: 'grid', gap: '15px' } },
              currentSeason.dates.map((date, idx) =>
                React.createElement('div', {
                  key: idx,
                  style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 25px',
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '12px',
                    border: '2px solid rgba(218, 165, 32, 0.2)',
                    transition: 'all 0.3s ease'
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.background = 'rgba(139, 115, 85, 0.2)';
                    e.currentTarget.style.borderColor = '#daa520';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.background = 'rgba(0,0,0,0.3)';
                    e.currentTarget.style.borderColor = 'rgba(218, 165, 32, 0.2)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }
                },
                  React.createElement('span', {
                    style: {
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#daa520',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }
                  }, date.period),
                  React.createElement('span', {
                    style: {
                      fontSize: '18px',
                      color: '#f5f5f5',
                      fontWeight: '400'
                    }
                  }, `${date.start} — ${date.end}`)
                )
              )
            )
          ),

          // Bag Limits
          React.createElement('div', { style: { marginBottom: '40px' } },
            React.createElement('h3', {
              style: {
                fontFamily: "'Oswald', sans-serif",
                fontSize: '24px',
                color: '#daa520',
                marginBottom: '25px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }
            },
              React.createElement(Target),
              'Bag Limits'
            ),
            React.createElement('div', {
              style: {
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '15px'
              }
            },
              currentSeason.limits.map((limit, idx) =>
                React.createElement('div', {
                  key: idx,
                  style: {
                    padding: '18px 22px',
                    background: 'rgba(0,0,0,0.3)',
                    borderLeft: '4px solid #daa520',
                    borderRadius: '8px',
                    color: '#f5f5f5',
                    fontSize: '16px',
                    transition: 'all 0.3s ease'
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.background = 'rgba(139, 115, 85, 0.2)';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.background = 'rgba(0,0,0,0.3)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }
                }, `• ${limit}`)
              )
            )
          ),

          // Shooting Hours
          React.createElement('div', {
            style: {
              padding: '25px 30px',
              background: 'rgba(218, 165, 32, 0.15)',
              borderRadius: '12px',
              border: '2px solid #daa520',
              marginBottom: '30px'
            }
          },
            React.createElement('h3', {
              style: {
                fontFamily: "'Oswald', sans-serif",
                fontSize: '20px',
                color: '#daa520',
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }
            },
              React.createElement(Info),
              'Shooting Hours'
            ),
            React.createElement('p', {
              style: {
                fontSize: '18px',
                color: '#f5f5f5',
                margin: 0,
                fontWeight: '400'
              }
            }, currentSeason.hours)
          ),

          // Important Notes
          currentSeason.note && React.createElement('div', {
            style: {
              padding: '25px 30px',
              background: 'rgba(0,0,0,0.4)',
              borderRadius: '12px',
              border: '2px solid rgba(255, 152, 0, 0.5)',
              borderLeft: '6px solid #ff9800'
            }
          },
            React.createElement('p', {
              style: {
                fontSize: '16px',
                color: '#ffa726',
                margin: 0,
                lineHeight: '1.6',
                fontWeight: '600'
              }
            },
              React.createElement('strong', {}, '📌 Important: '),
              currentSeason.note
            )
          )
        ),

        // Footer Info
        React.createElement('div', {
          style: {
            marginTop: '50px',
            padding: '40px',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '15px',
            border: '2px solid rgba(218, 165, 32, 0.2)',
            animation: 'fadeSlideIn 1.2s ease-out'
          }
        },
          React.createElement('h3', {
            style: {
              fontFamily: "'Oswald', sans-serif",
              fontSize: '26px',
              color: '#daa520',
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }
          }, 'License Requirements'),
          React.createElement('div', {
            style: {
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
              color: '#c9d1d9',
              fontSize: '16px',
              lineHeight: '1.8'
            }
          },
            React.createElement('div', {},
              React.createElement('p', { style: { margin: '0 0 10px 0' } }, '✓ Valid Arkansas hunting license'),
              React.createElement('p', { style: { margin: '0 0 10px 0' } }, '✓ HIP registration'),
              React.createElement('p', { style: { margin: '0 0 10px 0' } }, '✓ State waterfowl stamp')
            ),
            React.createElement('div', {},
              React.createElement('p', { style: { margin: '0 0 10px 0' } }, '✓ Federal waterfowl stamp'),
              React.createElement('p', { style: { margin: '0 0 10px 0' } }, '✓ WMA permit (if hunting WMAs)'),
              React.createElement('p', { style: { margin: '0 0 10px 0' } }, '✓ Hunter education (if born after 1/1/69)')
            )
          ),
          React.createElement('div', {
            style: {
              marginTop: '30px',
              paddingTop: '25px',
              borderTop: '1px solid rgba(218, 165, 32, 0.3)',
              textAlign: 'center'
            }
          },
            React.createElement('p', {
              style: {
                fontSize: '14px',
                color: '#999',
                margin: 0,
                fontStyle: 'italic'
              }
            },
              'Season dates subject to change. Always verify current regulations at ',
              React.createElement('a', {
                href: 'https://www.agfc.com',
                style: { color: '#daa520', textDecoration: 'none' }
              }, 'www.agfc.com'),
              ' before hunting.',
              React.createElement('br'),
              '2026-27 dates will be updated once officially announced by AGFC.'
            )
          )
        )
      )
    );
  };

  // Render the component
  const root = ReactDOM.createRoot(document.getElementById('waterfowl-calendar-root'));
  root.render(React.createElement(WaterfowlCalendar));
})();