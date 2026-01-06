/**
 * ============================================================================
 * MID-2000s BODYBUILDING FORUM AESTHETIC - DESIGN REFERENCE DOCUMENT
 * ============================================================================
 * 
 * This file serves as a comprehensive design reference for recreating the
 * visual language of fitness forums and imageboards from roughly 2004-2012.
 * 
 * PRIMARY INFLUENCES:
 * - Bodybuilding.com forums (especially "The Misc")
 * - T-Nation / T-Muscle forums
 * - Wannabebig forums
 * - EliteFitness forums
 * - Generic phpBB and vBulletin installations
 * 
 * The aesthetic evolved across this period:
 * - Early era (2004-2006): Lighter themes, more Web 1.0, table-heavy
 * - Peak era (2007-2010): Dark themes dominate, Web 2.0 glossy buttons, gradients
 * - Late era (2011-2012): Early responsive attempts, more rounded corners, Zyzz culture
 * 
 * This reference targets the "peak era" as it's most distinctive and memorable.
 * 
 * ============================================================================
 */

import React, { useState } from 'react';

/**
 * ============================================================================
 * COLOR PALETTE REFERENCE
 * ============================================================================
 * 
 * The color choices here are deliberate callbacks to specific forum software
 * defaults and the broader aesthetic sensibilities of the era.
 * 
 * BACKGROUND COLORS:
 * These forums favored dark themes for several reasons:
 * 1. Easier on the eyes during late-night browsing sessions
 * 2. Made colorful elements (avatars, rep bars) pop more
 * 3. Felt more "hardcore" and serious compared to bright Web 1.0 sites
 * 4. CRT monitors were still common; dark themes reduced eye strain
 * 
 * The specific navy-tinged blacks (#0d0d1a, #1a1a2e) rather than pure black
 * were common because:
 * - Pure black (#000) felt too stark and "cheap"
 * - The blue tint tied into the vBulletin default blue accent colors
 * - It created a cohesive "night mode" feel before dark mode was standard
 */
const COLORS = {
  // Background hierarchy - darkest to lightest
  bgDeepest: '#0a0a15',      // Used for inset elements, quote boxes, inputs
  bgDark: '#0d0d1a',         // Page background
  bgMedium: '#12121f',       // Content area background
  bgLight: '#151525',        // Slightly elevated elements
  bgLighter: '#1a1a2e',      // Alternating row color, cards
  bgLightest: '#1a2540',     // Headers, nav elements (note the blue tint)
  
  // The iconic vBulletin blue - this specific shade is burned into memories
  // It was the default link/accent color in vBulletin 3.x installations
  vbBlue: '#3a5795',
  vbBlueLight: '#7799cc',    // Lighter variant for links, secondary text
  
  // Accent colors - these were SATURATED, not the muted tones of modern design
  // The philosophy was "if it's important, make it POP"
  accentOrange: '#ff6600',   // Primary accent - used for usernames, important elements
  accentRed: '#cc3333',      // Warnings, high RPE, mod actions
  accentGreen: '#00cc00',    // Online indicators, positive rep, success states
  accentYellow: '#cc9900',   // User titles, medium warnings, gold status
  
  // Text colors - high contrast was the norm
  textPrimary: '#ffffff',    // Headers, important text
  textSecondary: '#cccccc',  // Body text
  textMuted: '#888888',      // Secondary info, timestamps
  textDark: '#666666',       // Very subtle text, footers
  textDarkest: '#444444',    // Nearly invisible, legal text
  
  // Border color - visible borders were structural AND decorative
  border: '#333333',
  borderLight: '#444444',
  
  // Special colors
  onlineGreen: '#00ff00',    // That bright green "online" dot
  linkVisited: '#551a8b',    // Purple visited links (browser default, often kept)
  linkBlue: '#0000ff',       // Classic blue links (sometimes used)
};

/**
 * ============================================================================
 * TYPOGRAPHY REFERENCE
 * ============================================================================
 * 
 * Font choices in this era were constrained by what was "web safe" - fonts
 * that could be expected to exist on most computers. @font-face existed but
 * was barely used until ~2010. Google Fonts launched in 2010.
 * 
 * THE HOLY TRINITY: Verdana, Tahoma, Arial
 * 
 * Verdana was the king of forum typography because:
 * - Designed by Microsoft specifically for screen readability at small sizes
 * - Wide letterforms made 10-11px text actually readable
 * - Available on both Windows and Mac
 * - Felt more "modern" than Times New Roman
 * 
 * Tahoma was the runner-up:
 * - Similar to Verdana but slightly more condensed
 * - Default Windows UI font, felt familiar
 * - Good for UI elements and buttons
 * 
 * Arial was the fallback:
 * - Universal availability
 * - Neutral, if boring
 * - helvetica, arial, sans-serif was the classic stack
 * 
 * FONT SIZES WERE TINY by modern standards:
 * - 10px: Fine print, timestamps, post counts
 * - 11px: Body text, the workhorse size
 * - 12px: Slightly emphasized text
 * - 14-16px: Section headers
 * - 18-24px: Page titles (rare, usually just the logo)
 * 
 * This was partially because:
 * - Screen resolutions were lower (1024x768 was standard)
 * - Information density was prized over readability
 * - Mobile didn't exist as a concern
 * - It felt "professional" and "serious"
 */
const TYPOGRAPHY = {
  // The classic forum font stack
  fontFamily: 'Verdana, Tahoma, Arial, sans-serif',
  
  // For logos and dramatic headers - Impact was everywhere
  // Impact + gradient + drop shadow = peak 2000s aesthetic
  fontFamilyDisplay: 'Impact, Arial Black, sans-serif',
  
  // Monospace for stats, code, signatures with formatted text
  fontFamilyMono: 'Courier New, Courier, monospace',
  
  // Size scale - note how small these are
  sizeXs: '9px',    // Legal text, copyright notices
  sizeSm: '10px',   // Timestamps, labels, fine print
  sizeMd: '11px',   // Body text - THE standard
  sizeLg: '12px',   // Slightly emphasized
  sizeXl: '14px',   // Section headers
  size2xl: '16px',  // Major headers
  size3xl: '24px',  // Logo/title only
};

/**
 * ============================================================================
 * COMPONENT: GlossyButton
 * ============================================================================
 * 
 * THE WEB 2.0 BUTTON - This is perhaps the most iconic UI element of the era.
 * 
 * The "glossy button" emerged around 2005-2006 as CSS became more capable.
 * It was characterized by:
 * 
 * 1. GRADIENT BACKGROUNDS
 *    - Top half: lighter shade
 *    - Middle: a hard or soft line (the "reflection")
 *    - Bottom half: darker shade
 *    This mimicked the look of glossy plastic or glass buttons.
 * 
 * 2. INNER HIGHLIGHT
 *    A subtle white or light inner shadow at the top edge, simulating
 *    light hitting the top of a 3D button.
 * 
 * 3. DROP SHADOW
 *    Buttons "floated" above the page with visible shadows.
 * 
 * 4. 1px SOLID BORDER
 *    Usually black or very dark, giving the button a defined edge.
 * 
 * 5. TEXT SHADOW
 *    Dark shadow behind light text for that "embossed" look.
 * 
 * This style was so prevalent it became a cliché by 2011-2012, leading to
 * the "flat design" revolution. But in its era, it was EXCITING - it showed
 * that the web could have rich, almost-native UI elements.
 * 
 * The button below is a faithful recreation of this style.
 */
const GlossyButton = ({ children, active, onClick, color = COLORS.vbBlue, size = 'medium' }) => {
  const sizes = {
    small: { padding: '4px 10px', fontSize: '10px' },
    medium: { padding: '6px 14px', fontSize: '11px' },
    large: { padding: '8px 18px', fontSize: '12px' },
  };
  
  return (
    <button
      onClick={onClick}
      style={{
        /**
         * The gradient is the heart of the glossy effect.
         * Note the hard stop at 50%/51% - this creates the "reflection line"
         * that makes it look like light is hitting a curved surface.
         */
        background: active 
          ? `linear-gradient(180deg, ${color} 0%, ${color}dd 50%, ${color}bb 51%, ${color}99 100%)`
          : 'linear-gradient(180deg, #555 0%, #444 50%, #333 51%, #222 100%)',
        
        // Always a solid, dark border - no subtle borders in this era
        border: '1px solid #000',
        
        // Slight rounding - but not too much. Heavy rounding came later.
        borderRadius: '3px',
        
        color: '#fff',
        ...sizes[size],
        fontFamily: TYPOGRAPHY.fontFamily,
        fontWeight: 'bold',
        cursor: 'pointer',
        
        // Text shadow for the embossed/engraved text effect
        textShadow: '1px 1px 1px rgba(0,0,0,0.5)',
        
        /**
         * Box shadow does double duty:
         * - inset shadow at top = highlight/reflection
         * - outer shadow = floating effect
         */
        boxShadow: active 
          ? 'inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.5)' 
          : 'inset 0 1px 0 rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.3)',
      }}
    >
      {children}
    </button>
  );
};

/**
 * ============================================================================
 * COMPONENT: RepBar
 * ============================================================================
 * 
 * THE REPUTATION SYSTEM - A cornerstone of forum culture.
 * 
 * Rep systems served multiple purposes:
 * 1. Social hierarchy visualization
 * 2. Quality control (high-rep users were more trusted)
 * 3. Gamification before that was a buzzword
 * 4. Drama fuel (rep wars, neg-rep brigades)
 * 
 * The visual representation as colored squares was brilliant because:
 * - Instantly scannable at small sizes
 * - Clear progression (more green = more respected)
 * - Could show negative rep (red squares) on some forums
 * - Satisfying to "fill up" your bar
 * 
 * Different forums had different systems:
 * - Bodybuilding.com: Green squares, could give/receive
 * - Something Awful: No rep, but custom titles purchasable
 * - Reddit (later): Karma, but invisible rep
 * 
 * The squares were typically 6-10px, with 1px borders between them.
 */
const RepBar = ({ count, maxSquares = 10, squareSize = 8 }) => {
  const squares = [];
  const fullSquares = Math.min(Math.floor(count / 20), maxSquares);
  
  for (let i = 0; i < maxSquares; i++) {
    squares.push(
      <div 
        key={i} 
        style={{
          width: `${squareSize}px`,
          height: `${squareSize}px`,
          // Green for earned rep, dark gray for unearned
          // Some forums used gradients here too
          backgroundColor: i < fullSquares ? COLORS.accentGreen : '#333',
          // The 1px black border was essential - without it, squares blur together
          border: '1px solid #000',
          display: 'inline-block',
          marginRight: '1px',
        }}
      />
    );
  }
  return <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>{squares}</div>;
};

/**
 * ============================================================================
 * COMPONENT: UserPanel
 * ============================================================================
 * 
 * THE LEFT SIDEBAR USER INFO PANEL - Perhaps the most distinctive element
 * of forum design, and the thing that most clearly distinguishes "forum"
 * from "social media" in visual language.
 * 
 * This panel appeared to the left of every post and contained:
 * 
 * 1. USERNAME (styled by rank/group)
 *    - Regular users: blue
 *    - Premium/verified: orange or gold
 *    - Moderators: red or green
 *    - Admins: special color, often with effects
 * 
 * 2. USER TITLE
 *    - Could be based on post count ("Newbie" → "Regular" → "Freak" → "Legend")
 *    - Or custom (paid feature on some forums)
 *    - Or assigned by mods (punishment or reward)
 * 
 * 3. AVATAR
 *    - Originally very small (50x50 to 100x100)
 *    - GIFs were allowed and ABUSED (flashing, spinning text)
 *    - Quality varied wildly
 *    - Some forums had avatar galleries to choose from
 * 
 * 4. POST COUNT
 *    - The primary status symbol
 *    - Some users would spam to inflate counts
 *    - Forums often had "post count++" sections that didn't count
 * 
 * 5. REP POWER / REPUTATION
 *    - Displayed as bars, squares, or numbers
 *    - Could be hidden on some forums
 * 
 * 6. JOIN DATE
 *    - Older = more respected (usually)
 *    - "I've been here since the beginning" was a flex
 * 
 * 7. LOCATION
 *    - Often a joke ("The Iron Temple", "Valhalla")
 *    - Or real location for local meetups
 * 
 * The fixed width (~150px) was standard because it needed to:
 * - Be wide enough for avatars and stats
 * - Not take too much space from post content
 * - Work on 800x600 and 1024x768 screens
 */
const UserPanel = ({ user, isCurrentUser = false }) => (
  <div style={{
    width: '150px',
    minWidth: '150px', // Prevent shrinking - fixed width was standard
    padding: '8px',
    backgroundColor: COLORS.bgLighter,
    // Vertical divider between user panel and post content
    borderRight: `1px solid ${COLORS.border}`,
    fontSize: TYPOGRAPHY.sizeSm,
    fontFamily: TYPOGRAPHY.fontFamily,
    textAlign: 'center',
  }}>
    {/* Username with online indicator */}
    <div style={{ 
      fontSize: TYPOGRAPHY.sizeMd, 
      fontWeight: 'bold', 
      // Orange for current user / premium, blue for regular users
      // This color coding was instant status recognition
      color: isCurrentUser ? COLORS.accentOrange : COLORS.vbBlueLight,
      marginBottom: '4px'
    }}>
      {/* The green dot - simple but iconic */}
      {user.online && <span style={{ color: COLORS.onlineGreen, marginRight: '4px' }}>●</span>}
      {user.author || user.username}
    </div>
    
    {/* User title - italicized, color-coded by rank */}
    <div style={{ 
      color: user.title === 'Administrator' ? '#ff3333' 
           : user.title === 'Moderator' ? '#33cc33'
           : user.title === 'Verified Freak' ? '#ff3333' 
           : COLORS.accentYellow, 
      fontStyle: 'italic',
      marginBottom: '8px',
      fontSize: TYPOGRAPHY.sizeXs,
    }}>
      {user.title}
    </div>
    
    {/* Avatar container */}
    <div style={{
      width: '80px',
      height: '80px',
      margin: '0 auto 8px',
      backgroundColor: COLORS.bgMedium,
      // Double border was common - gave a "frame" effect
      border: `2px solid ${COLORS.borderLight}`,
      borderRadius: '2px', // Barely rounded - square avatars were the norm
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '32px',
      // Some forums added inner shadow for depth
      boxShadow: 'inset 0 0 4px rgba(0,0,0,0.5)',
    }}>
      {user.avatar || '🏋️'}
    </div>
    
    {/* Stats - post count was EVERYTHING */}
    <div style={{ color: COLORS.textMuted, marginBottom: '4px' }}>
      Posts: <span style={{ color: COLORS.textSecondary }}>{user.posts?.toLocaleString()}</span>
    </div>
    
    {/* Rep display */}
    <div style={{ color: COLORS.textMuted, marginBottom: '4px' }}>
      Rep Power: <span style={{ color: COLORS.accentGreen }}>{user.rep}</span>
    </div>
    <RepBar count={user.rep} />
    
    {/* Location - often jokes or gym references */}
    {user.location && (
      <div style={{ color: COLORS.textDark, marginTop: '8px', fontSize: TYPOGRAPHY.sizeXs }}>
        📍 {user.location}
      </div>
    )}
    
    {/* Join date - seniority marker */}
    <div style={{ color: COLORS.textDark, marginTop: '4px', fontSize: TYPOGRAPHY.sizeXs }}>
      Join Date: {user.joinDate}
    </div>
  </div>
);

/**
 * ============================================================================
 * COMPONENT: LoginBox
 * ============================================================================
 * 
 * THE LOGIN FORM - Usually appeared in a sidebar or popup.
 * 
 * Design characteristics:
 * 1. Compact - designed to fit in 200-250px width sidebars
 * 2. Dark inputs with light text (inverted from modern light inputs)
 * 3. "Remember me" checkbox was standard
 * 4. Often had "Forgot password?" link below
 * 5. Registration link prominently displayed
 * 
 * The form styling reflects the era's approach:
 * - Visible borders on EVERYTHING
 * - No placeholder text (that came later with HTML5)
 * - Labels above or beside inputs, not floating
 * - Submit button was a glossy button, of course
 */
const LoginBox = () => (
  <div style={{
    width: '240px',
    backgroundColor: COLORS.bgLighter,
    border: `1px solid ${COLORS.border}`,
    borderRadius: '4px',
    overflow: 'hidden',
  }}>
    {/* Header with gradient - mini version of the main header style */}
    <div style={{
      background: `linear-gradient(180deg, ${COLORS.bgLightest} 0%, ${COLORS.bgDark} 100%)`,
      padding: '8px 12px',
      borderBottom: `1px solid ${COLORS.border}`,
    }}>
      <div style={{
        color: COLORS.textPrimary,
        fontSize: TYPOGRAPHY.sizeMd,
        fontWeight: 'bold',
        fontFamily: TYPOGRAPHY.fontFamily,
      }}>
        🔐 Member Login
      </div>
    </div>
    
    <div style={{ padding: '12px' }}>
      {/* Username field */}
      <div style={{ marginBottom: '10px' }}>
        <label style={{
          display: 'block',
          color: COLORS.textMuted,
          fontSize: TYPOGRAPHY.sizeSm,
          marginBottom: '4px',
          fontFamily: TYPOGRAPHY.fontFamily,
        }}>
          Username:
        </label>
        <input
          type="text"
          style={{
            width: '100%',
            padding: '6px 8px',
            backgroundColor: COLORS.bgDeepest,
            border: `1px solid ${COLORS.border}`,
            borderRadius: '2px',
            color: COLORS.textSecondary,
            fontSize: TYPOGRAPHY.sizeMd,
            fontFamily: TYPOGRAPHY.fontFamily,
            // Box sizing wasn't always border-box back then, but we'll use it
            boxSizing: 'border-box',
          }}
        />
      </div>
      
      {/* Password field */}
      <div style={{ marginBottom: '10px' }}>
        <label style={{
          display: 'block',
          color: COLORS.textMuted,
          fontSize: TYPOGRAPHY.sizeSm,
          marginBottom: '4px',
          fontFamily: TYPOGRAPHY.fontFamily,
        }}>
          Password:
        </label>
        <input
          type="password"
          style={{
            width: '100%',
            padding: '6px 8px',
            backgroundColor: COLORS.bgDeepest,
            border: `1px solid ${COLORS.border}`,
            borderRadius: '2px',
            color: COLORS.textSecondary,
            fontSize: TYPOGRAPHY.sizeMd,
            fontFamily: TYPOGRAPHY.fontFamily,
            boxSizing: 'border-box',
          }}
        />
      </div>
      
      {/* Remember me checkbox - the classic pattern */}
      <div style={{ marginBottom: '12px' }}>
        <label style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: COLORS.textMuted,
          fontSize: TYPOGRAPHY.sizeSm,
          fontFamily: TYPOGRAPHY.fontFamily,
          cursor: 'pointer',
        }}>
          <input type="checkbox" style={{ accentColor: COLORS.vbBlue }} />
          Remember Me
        </label>
      </div>
      
      {/* Login button */}
      <GlossyButton size="medium">
        Log In
      </GlossyButton>
      
      {/* Links section */}
      <div style={{
        marginTop: '12px',
        paddingTop: '10px',
        borderTop: `1px solid ${COLORS.border}`,
        fontSize: TYPOGRAPHY.sizeXs,
        fontFamily: TYPOGRAPHY.fontFamily,
      }}>
        <a href="#" style={{ color: COLORS.vbBlueLight, display: 'block', marginBottom: '4px' }}>
          Forgot Password?
        </a>
        <a href="#" style={{ color: COLORS.accentOrange }}>
          Register Now - It's Free!
        </a>
      </div>
    </div>
  </div>
);

/**
 * ============================================================================
 * COMPONENT: PopupMenu
 * ============================================================================
 * 
 * DROPDOWN/POPUP MENUS - These were often JavaScript-powered (or even
 * just CSS :hover based) and had very distinctive styling.
 * 
 * Characteristics:
 * 1. Sharp corners or very slight rounding
 * 2. Dark background, lighter on hover
 * 3. Visible borders and sometimes shadows
 * 4. Often had little triangular "pointers" showing where they came from
 * 5. Items had hover states that were obvious (background color change)
 * 
 * These menus appeared for:
 * - User actions (profile, settings, logout)
 * - Quick navigation
 * - Mod tools
 * - Post actions (edit, delete, report)
 */
const PopupMenu = ({ title, items }) => (
  <div style={{
    width: '180px',
    backgroundColor: COLORS.bgLighter,
    border: `1px solid ${COLORS.border}`,
    borderRadius: '3px',
    // The drop shadow was always visible, not subtle
    boxShadow: '2px 2px 8px rgba(0,0,0,0.5)',
    overflow: 'hidden',
  }}>
    {/* Menu header */}
    <div style={{
      background: `linear-gradient(180deg, ${COLORS.bgLightest} 0%, ${COLORS.bgDark} 100%)`,
      padding: '6px 10px',
      borderBottom: `1px solid ${COLORS.border}`,
      color: COLORS.textPrimary,
      fontSize: TYPOGRAPHY.sizeSm,
      fontWeight: 'bold',
      fontFamily: TYPOGRAPHY.fontFamily,
    }}>
      {title}
    </div>
    
    {/* Menu items */}
    {items.map((item, i) => (
      <div
        key={i}
        style={{
          padding: '6px 10px',
          fontSize: TYPOGRAPHY.sizeSm,
          fontFamily: TYPOGRAPHY.fontFamily,
          color: item.danger ? COLORS.accentRed : COLORS.vbBlueLight,
          cursor: 'pointer',
          // Alternating backgrounds were common even in menus
          backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.2)',
          borderBottom: i < items.length - 1 ? `1px solid ${COLORS.border}` : 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ width: '16px', textAlign: 'center' }}>{item.icon}</span>
        {item.label}
      </div>
    ))}
  </div>
);

/**
 * ============================================================================
 * COMPONENT: ForumCalendar
 * ============================================================================
 * 
 * CALENDAR WIDGETS - Usually appeared in sidebars to show:
 * - Upcoming events (competitions, meetups)
 * - Member birthdays (a beloved feature)
 * - Site milestones
 * 
 * Design approach:
 * 1. Compact - had to fit in ~200px sidebars
 * 2. Table-based layout (grids weren't a thing yet)
 * 3. Current day highlighted
 * 4. Days with events marked with colors or dots
 * 5. Navigation arrows for month switching
 * 
 * The styling follows the same principles as everything else:
 * - Visible borders
 * - Dark backgrounds
 * - High contrast text
 * - Glossy buttons for navigation
 */
const ForumCalendar = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const currentMonth = [
    [null, null, null, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, 29, 30, 31, null],
  ];
  
  // Days with "events" - workouts logged, competitions, etc.
  const eventDays = [3, 5, 8, 10, 12, 15, 17, 19, 22, 24, 26, 29, 31];
  const today = 5; // January 5th per the system date
  
  return (
    <div style={{
      width: '220px',
      backgroundColor: COLORS.bgLighter,
      border: `1px solid ${COLORS.border}`,
      borderRadius: '4px',
      overflow: 'hidden',
    }}>
      {/* Calendar header with month/year and navigation */}
      <div style={{
        background: `linear-gradient(180deg, ${COLORS.bgLightest} 0%, ${COLORS.bgDark} 100%)`,
        padding: '8px',
        borderBottom: `1px solid ${COLORS.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {/* Previous month arrow */}
        <span style={{ 
          color: COLORS.vbBlueLight, 
          cursor: 'pointer',
          fontSize: TYPOGRAPHY.sizeMd,
          padding: '2px 6px',
        }}>
          ◀
        </span>
        
        <span style={{
          color: COLORS.textPrimary,
          fontSize: TYPOGRAPHY.sizeMd,
          fontWeight: 'bold',
          fontFamily: TYPOGRAPHY.fontFamily,
        }}>
          January 2026
        </span>
        
        {/* Next month arrow */}
        <span style={{ 
          color: COLORS.vbBlueLight, 
          cursor: 'pointer',
          fontSize: TYPOGRAPHY.sizeMd,
          padding: '2px 6px',
        }}>
          ▶
        </span>
      </div>
      
      {/* Calendar grid */}
      <div style={{ padding: '8px' }}>
        {/* Day headers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '2px',
          marginBottom: '4px',
        }}>
          {days.map((day, i) => (
            <div key={i} style={{
              textAlign: 'center',
              fontSize: TYPOGRAPHY.sizeXs,
              fontWeight: 'bold',
              color: i === 0 || i === 6 ? COLORS.accentRed : COLORS.textMuted,
              fontFamily: TYPOGRAPHY.fontFamily,
              padding: '4px 0',
            }}>
              {day}
            </div>
          ))}
        </div>
        
        {/* Date grid */}
        {currentMonth.map((week, weekIndex) => (
          <div key={weekIndex} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '2px',
          }}>
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                style={{
                  textAlign: 'center',
                  padding: '4px 2px',
                  fontSize: TYPOGRAPHY.sizeSm,
                  fontFamily: TYPOGRAPHY.fontFamily,
                  borderRadius: '2px',
                  cursor: day ? 'pointer' : 'default',
                  // Today gets the highlight treatment
                  backgroundColor: day === today 
                    ? COLORS.vbBlue 
                    : eventDays.includes(day) 
                      ? 'rgba(0, 204, 0, 0.2)' // Subtle green for workout days
                      : 'transparent',
                  color: day === today 
                    ? COLORS.textPrimary 
                    : day 
                      ? (dayIndex === 0 || dayIndex === 6) 
                        ? COLORS.accentRed  // Weekends in red
                        : COLORS.textSecondary 
                      : 'transparent',
                  border: day === today 
                    ? `1px solid ${COLORS.accentOrange}` 
                    : '1px solid transparent',
                  fontWeight: day === today ? 'bold' : 'normal',
                }}
              >
                {day || ''}
              </div>
            ))}
          </div>
        ))}
        
        {/* Legend */}
        <div style={{
          marginTop: '8px',
          paddingTop: '8px',
          borderTop: `1px solid ${COLORS.border}`,
          fontSize: TYPOGRAPHY.sizeXs,
          color: COLORS.textDark,
          fontFamily: TYPOGRAPHY.fontFamily,
          display: 'flex',
          gap: '12px',
        }}>
          <span>
            <span style={{ 
              display: 'inline-block', 
              width: '8px', 
              height: '8px', 
              backgroundColor: COLORS.vbBlue,
              marginRight: '4px',
            }}></span>
            Today
          </span>
          <span>
            <span style={{ 
              display: 'inline-block', 
              width: '8px', 
              height: '8px', 
              backgroundColor: 'rgba(0, 204, 0, 0.5)',
              marginRight: '4px',
            }}></span>
            Workout
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * ============================================================================
 * COMPONENT: AlertBanner
 * ============================================================================
 * 
 * ANNOUNCEMENTS & ALERTS - Forums had various banner types for:
 * - Site announcements
 * - Mod warnings
 * - Promotional messages
 * - Error states
 * - Success confirmations
 * 
 * These were typically:
 * 1. Full-width or nearly so
 * 2. Color-coded by severity/type
 * 3. Often dismissible with an "X"
 * 4. Sometimes animated (flashing was not uncommon for urgent messages)
 */
const AlertBanner = ({ type = 'info', children, dismissible = true }) => {
  const styles = {
    info: {
      background: `linear-gradient(180deg, #1a3a5a 0%, #0f2540 100%)`,
      borderColor: COLORS.vbBlue,
      icon: 'ℹ️',
    },
    warning: {
      background: `linear-gradient(180deg, #5a4a1a 0%, #403510 100%)`,
      borderColor: COLORS.accentYellow,
      icon: '⚠️',
    },
    error: {
      background: `linear-gradient(180deg, #5a1a1a 0%, #401010 100%)`,
      borderColor: COLORS.accentRed,
      icon: '❌',
    },
    success: {
      background: `linear-gradient(180deg, #1a5a2a 0%, #104020 100%)`,
      borderColor: COLORS.accentGreen,
      icon: '✅',
    },
  };
  
  const style = styles[type];
  
  return (
    <div style={{
      background: style.background,
      border: `1px solid ${style.borderColor}`,
      borderLeft: `4px solid ${style.borderColor}`,
      borderRadius: '3px',
      padding: '10px 14px',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontFamily: TYPOGRAPHY.fontFamily,
      fontSize: TYPOGRAPHY.sizeMd,
    }}>
      <span style={{ fontSize: '16px' }}>{style.icon}</span>
      <span style={{ color: COLORS.textSecondary, flex: 1 }}>{children}</span>
      {dismissible && (
        <span style={{ 
          color: COLORS.textDark, 
          cursor: 'pointer',
          fontSize: TYPOGRAPHY.sizeLg,
          padding: '2px 6px',
        }}>
          ✕
        </span>
      )}
    </div>
  );
};

/**
 * ============================================================================
 * COMPONENT: ThreadListItem
 * ============================================================================
 * 
 * THE THREAD LIST - The main view of most forums was a list of threads.
 * Each row contained:
 * 
 * 1. THREAD ICON
 *    - Indicated status: new posts, hot thread, locked, sticky
 *    - Usually small images or later Unicode symbols
 * 
 * 2. THREAD TITLE
 *    - Bold, linked
 *    - Might have prefix tags like [SOLVED] or [NSFW]
 * 
 * 3. AUTHOR INFO
 *    - Who started the thread
 *    - Usually smaller text below title
 * 
 * 4. REPLY/VIEW COUNT
 *    - Separate columns
 *    - High numbers = popular thread
 * 
 * 5. LAST POST INFO
 *    - Who posted last, when
 *    - Linked to jump to last post
 * 
 * The alternating row colors (zebra striping) were essential for readability
 * in these dense, information-packed lists.
 */
const ThreadListItem = ({ thread, index }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: '30px 1fr 80px 80px 160px',
    alignItems: 'center',
    padding: '8px 10px',
    // Zebra striping - THE classic forum look
    backgroundColor: index % 2 === 0 ? COLORS.bgLighter : COLORS.bgLight,
    borderBottom: `1px solid ${COLORS.border}`,
    fontFamily: TYPOGRAPHY.fontFamily,
  }}>
    {/* Thread status icon */}
    <div style={{ textAlign: 'center' }}>
      {thread.sticky ? '📌' : thread.hot ? '🔥' : thread.locked ? '🔒' : '💬'}
    </div>
    
    {/* Thread title and author */}
    <div>
      <div style={{ marginBottom: '2px' }}>
        {thread.sticky && (
          <span style={{
            backgroundColor: COLORS.accentRed,
            color: COLORS.textPrimary,
            fontSize: TYPOGRAPHY.sizeXs,
            padding: '1px 4px',
            borderRadius: '2px',
            marginRight: '6px',
            fontWeight: 'bold',
          }}>
            STICKY
          </span>
        )}
        <a href="#" style={{
          color: thread.unread ? COLORS.textPrimary : COLORS.vbBlueLight,
          fontWeight: thread.unread ? 'bold' : 'normal',
          fontSize: TYPOGRAPHY.sizeMd,
          textDecoration: 'none',
        }}>
          {thread.title}
        </a>
      </div>
      <div style={{ fontSize: TYPOGRAPHY.sizeXs, color: COLORS.textDark }}>
        by <a href="#" style={{ color: COLORS.vbBlueLight }}>{thread.author}</a>
      </div>
    </div>
    
    {/* Reply count */}
    <div style={{ textAlign: 'center', fontSize: TYPOGRAPHY.sizeSm, color: COLORS.textMuted }}>
      {thread.replies.toLocaleString()}
    </div>
    
    {/* View count */}
    <div style={{ textAlign: 'center', fontSize: TYPOGRAPHY.sizeSm, color: COLORS.textMuted }}>
      {thread.views.toLocaleString()}
    </div>
    
    {/* Last post info */}
    <div style={{ fontSize: TYPOGRAPHY.sizeXs }}>
      <div style={{ color: COLORS.textMuted }}>{thread.lastPost.date}</div>
      <div style={{ color: COLORS.textDark }}>
        by <a href="#" style={{ color: COLORS.vbBlueLight }}>{thread.lastPost.author}</a>
      </div>
    </div>
  </div>
);

/**
 * ============================================================================
 * COMPONENT: QuoteBox
 * ============================================================================
 * 
 * NESTED QUOTES - A distinctive feature of forum discussions.
 * 
 * Characteristics:
 * 1. Left border accent (usually blue or gray)
 * 2. Different background (darker/lighter than post)
 * 3. Attribution header ("Originally Posted by...")
 * 4. Could nest multiple levels deep (often 4-5+)
 * 5. Sometimes collapsible for very long quotes
 * 
 * The styling signaled "this is someone else's words" clearly.
 * Nested quotes got progressively smaller or more indented.
 */
const QuoteBox = ({ author, content, nested = false }) => (
  <div style={{
    backgroundColor: COLORS.bgDeepest,
    border: `1px solid ${COLORS.border}`,
    // The left border accent is iconic
    borderLeft: `3px solid ${COLORS.vbBlue}`,
    padding: '8px 12px',
    marginBottom: nested ? '8px' : '12px',
    fontSize: nested ? TYPOGRAPHY.sizeSm : TYPOGRAPHY.sizeMd,
    fontFamily: TYPOGRAPHY.fontFamily,
  }}>
    <div style={{ 
      color: COLORS.vbBlueLight, 
      marginBottom: '6px',
      fontSize: TYPOGRAPHY.sizeSm,
    }}>
      Originally Posted by <strong>{author}</strong>
    </div>
    <div style={{ 
      color: COLORS.textMuted, 
      fontStyle: 'italic',
      lineHeight: '1.5',
    }}>
      {content}
    </div>
  </div>
);

/**
 * ============================================================================
 * COMPONENT: Signature
 * ============================================================================
 * 
 * THE SIGNATURE - Personal branding, forum culture embodied.
 * 
 * Signatures were a way for users to express identity and were often:
 * 1. Stats blocks (height, weight, lifts)
 * 2. Motivational quotes (Arnold, Ronnie Coleman, later Zyzz)
 * 3. Progress pics (before/after)
 * 4. Animated GIF banners
 * 5. Links to training logs
 * 6. ASCII art
 * 7. Song lyrics
 * 8. Philosophical musings
 * 
 * They appeared below every post, separated by a dashed line.
 * Many forums limited signature size/images due to page load concerns.
 */
const Signature = ({ content }) => (
  <div style={{
    borderTop: `1px dashed ${COLORS.border}`,
    padding: '10px 12px',
    backgroundColor: 'rgba(0,0,0,0.2)',
    fontSize: TYPOGRAPHY.sizeXs,
    color: COLORS.textDark,
    fontFamily: TYPOGRAPHY.fontFamilyMono,
    whiteSpace: 'pre-line',
    lineHeight: '1.6',
  }}>
    {content}
  </div>
);

/**
 * ============================================================================
 * COMPONENT: ProgressBar
 * ============================================================================
 * 
 * PROGRESS BARS - Used everywhere:
 * - Loading indicators
 * - Profile completion
 * - Rep bars (sometimes)
 * - Goal tracking
 * - Poll results
 * 
 * The styling was always:
 * 1. Visible container with border
 * 2. Filled portion with gradient
 * 3. Often with percentage text overlay
 * 4. Sometimes animated/pulsing for active processes
 */
const ProgressBar = ({ value, max, label, color = COLORS.vbBlue }) => {
  const percentage = Math.round((value / max) * 100);
  
  return (
    <div style={{ marginBottom: '12px' }}>
      {label && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '4px',
          fontSize: TYPOGRAPHY.sizeSm,
          fontFamily: TYPOGRAPHY.fontFamily,
        }}>
          <span style={{ color: COLORS.textMuted }}>{label}</span>
          <span style={{ color: COLORS.textSecondary }}>{value} / {max}</span>
        </div>
      )}
      <div style={{
        height: '16px',
        backgroundColor: COLORS.bgDeepest,
        borderRadius: '8px',
        border: `1px solid ${COLORS.border}`,
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{
          height: '100%',
          width: `${percentage}%`,
          // Gradient gives the "glossy" bar effect
          background: `linear-gradient(180deg, ${color} 0%, ${color}88 100%)`,
          // Glow effect for extra punch
          boxShadow: `0 0 8px ${color}66`,
          transition: 'width 0.3s ease',
        }} />
        {/* Percentage overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: TYPOGRAPHY.sizeXs,
          fontWeight: 'bold',
          color: COLORS.textPrimary,
          textShadow: '1px 1px 1px rgba(0,0,0,0.8)',
          fontFamily: TYPOGRAPHY.fontFamily,
        }}>
          {percentage}%
        </div>
      </div>
    </div>
  );
};

/**
 * ============================================================================
 * COMPONENT: OnlineUsers
 * ============================================================================
 * 
 * "WHO'S ONLINE" WIDGET - Community awareness feature.
 * 
 * Usually showed:
 * - Total users online
 * - Members vs guests
 * - List of online usernames (often linked)
 * - All-time record
 * - Sometimes "invisible" user count (those who hid online status)
 * 
 * This widget reinforced the community aspect - you could see who was
 * around and potentially available to chat with.
 */
const OnlineUsers = () => (
  <div style={{
    width: '220px',
    backgroundColor: COLORS.bgLighter,
    border: `1px solid ${COLORS.border}`,
    borderRadius: '4px',
    overflow: 'hidden',
  }}>
    <div style={{
      background: `linear-gradient(180deg, ${COLORS.bgLightest} 0%, ${COLORS.bgDark} 100%)`,
      padding: '8px 12px',
      borderBottom: `1px solid ${COLORS.border}`,
    }}>
      <div style={{
        color: COLORS.textPrimary,
        fontSize: TYPOGRAPHY.sizeMd,
        fontWeight: 'bold',
        fontFamily: TYPOGRAPHY.fontFamily,
      }}>
        👥 Who's Online
      </div>
    </div>
    
    <div style={{ padding: '10px 12px', fontFamily: TYPOGRAPHY.fontFamily }}>
      {/* Stats line */}
      <div style={{ 
        fontSize: TYPOGRAPHY.sizeSm, 
        color: COLORS.textMuted,
        marginBottom: '8px',
      }}>
        <span style={{ color: COLORS.accentGreen, fontWeight: 'bold' }}>2,847</span> users online
        <br />
        <span style={{ fontSize: TYPOGRAPHY.sizeXs, color: COLORS.textDark }}>
          (412 members, 2,435 guests)
        </span>
      </div>
      
      {/* Online user list */}
      <div style={{
        fontSize: TYPOGRAPHY.sizeSm,
        lineHeight: '1.8',
      }}>
        <span style={{ color: COLORS.textDark }}>Members: </span>
        {['SwoleBrah92', 'IronMike', 'GymRat2020', 'LiftHeavy_Die', 'NattyOrNot'].map((user, i) => (
          <span key={user}>
            <a href="#" style={{ color: COLORS.vbBlueLight }}>{user}</a>
            {i < 4 ? ', ' : ''}
          </span>
        ))}
        <span style={{ color: COLORS.textDark }}> + 407 more</span>
      </div>
      
      {/* Record */}
      <div style={{
        marginTop: '10px',
        paddingTop: '8px',
        borderTop: `1px solid ${COLORS.border}`,
        fontSize: TYPOGRAPHY.sizeXs,
        color: COLORS.textDark,
      }}>
        Record: <span style={{ color: COLORS.textMuted }}>12,455</span> (January 1, 2010)
      </div>
    </div>
  </div>
);

/**
 * ============================================================================
 * COMPONENT: BBCodeToolbar
 * ============================================================================
 * 
 * THE BBCODE TOOLBAR - Forums used BBCode, not WYSIWYG editors.
 * 
 * BBCode was a simplified markup language:
 * [b]bold[/b], [i]italic[/i], [url=...]link[/url], [img]...[/img], etc.
 * 
 * The toolbar provided buttons to insert these tags:
 * 1. Basic formatting (bold, italic, underline, strikethrough)
 * 2. Lists (ordered, unordered)
 * 3. Links and images
 * 4. Quotes
 * 5. Code blocks
 * 6. Font size and color (often dropdowns)
 * 7. Smileys/emoticons
 * 
 * This was BEFORE rich text editors were common on the web.
 */
const BBCodeToolbar = () => {
  const buttons = [
    { label: 'B', style: { fontWeight: 'bold' }, title: 'Bold' },
    { label: 'I', style: { fontStyle: 'italic' }, title: 'Italic' },
    { label: 'U', style: { textDecoration: 'underline' }, title: 'Underline' },
    { label: 'S', style: { textDecoration: 'line-through' }, title: 'Strikethrough' },
    { label: '|', divider: true },
    { label: '🔗', title: 'Insert Link' },
    { label: '🖼️', title: 'Insert Image' },
    { label: '💬', title: 'Quote' },
    { label: '📝', title: 'Code' },
    { label: '|', divider: true },
    { label: '📋', title: 'List' },
    { label: '1.', title: 'Numbered List' },
    { label: '|', divider: true },
    { label: '😀', title: 'Smileys' },
  ];
  
  return (
    <div style={{
      backgroundColor: COLORS.bgLight,
      border: `1px solid ${COLORS.border}`,
      borderRadius: '3px 3px 0 0',
      padding: '4px 6px',
      display: 'flex',
      gap: '2px',
      flexWrap: 'wrap',
    }}>
      {buttons.map((btn, i) => (
        btn.divider ? (
          <div key={i} style={{
            width: '1px',
            backgroundColor: COLORS.border,
            margin: '2px 4px',
          }} />
        ) : (
          <button
            key={i}
            title={btn.title}
            style={{
              width: '26px',
              height: '24px',
              backgroundColor: COLORS.bgLighter,
              border: `1px solid ${COLORS.border}`,
              borderRadius: '2px',
              color: COLORS.textSecondary,
              cursor: 'pointer',
              fontSize: TYPOGRAPHY.sizeSm,
              fontFamily: TYPOGRAPHY.fontFamily,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ...btn.style,
            }}
          >
            {btn.label}
          </button>
        )
      ))}
      
      {/* Font size dropdown - era-appropriate */}
      <select style={{
        backgroundColor: COLORS.bgLighter,
        border: `1px solid ${COLORS.border}`,
        borderRadius: '2px',
        color: COLORS.textSecondary,
        fontSize: TYPOGRAPHY.sizeSm,
        fontFamily: TYPOGRAPHY.fontFamily,
        padding: '2px 4px',
        marginLeft: '4px',
      }}>
        <option>Size</option>
        <option>1 (tiny)</option>
        <option>2 (small)</option>
        <option>3 (normal)</option>
        <option>4 (large)</option>
        <option>5 (huge)</option>
      </select>
      
      {/* Color picker - simplified */}
      <select style={{
        backgroundColor: COLORS.bgLighter,
        border: `1px solid ${COLORS.border}`,
        borderRadius: '2px',
        color: COLORS.textSecondary,
        fontSize: TYPOGRAPHY.sizeSm,
        fontFamily: TYPOGRAPHY.fontFamily,
        padding: '2px 4px',
      }}>
        <option>Color</option>
        <option style={{ color: '#ff0000' }}>Red</option>
        <option style={{ color: '#0000ff' }}>Blue</option>
        <option style={{ color: '#00ff00' }}>Green</option>
        <option style={{ color: '#ff6600' }}>Orange</option>
      </select>
    </div>
  );
};

/**
 * ============================================================================
 * COMPONENT: ForumStats
 * ============================================================================
 * 
 * FORUM STATISTICS PANEL - Usually at the bottom of the main page.
 * 
 * Showed:
 * - Total posts, threads, members
 * - Newest member (welcomed!)
 * - Posts/threads today
 * - All-time records
 * 
 * This reinforced the sense of community scale and activity.
 * High numbers = popular, trustworthy forum.
 */
const ForumStats = () => (
  <div style={{
    backgroundColor: COLORS.bgLighter,
    border: `1px solid ${COLORS.border}`,
    borderRadius: '4px',
    padding: '12px 16px',
    fontFamily: TYPOGRAPHY.fontFamily,
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
  }}>
    {[
      { label: 'Total Posts', value: '4,521,847', icon: '📝' },
      { label: 'Total Threads', value: '312,456', icon: '💬' },
      { label: 'Total Members', value: '89,234', icon: '👥' },
      { label: 'Newest Member', value: 'BabyGains2026', icon: '🌟', link: true },
    ].map((stat, i) => (
      <div key={i} style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '20px', marginBottom: '4px' }}>{stat.icon}</div>
        <div style={{
          color: stat.link ? COLORS.accentOrange : COLORS.textPrimary,
          fontSize: TYPOGRAPHY.sizeLg,
          fontWeight: 'bold',
          marginBottom: '2px',
        }}>
          {stat.value}
        </div>
        <div style={{
          color: COLORS.textDark,
          fontSize: TYPOGRAPHY.sizeXs,
        }}>
          {stat.label}
        </div>
      </div>
    ))}
  </div>
);

/**
 * ============================================================================
 * COMPONENT: PollWidget
 * ============================================================================
 * 
 * FORUM POLLS - A beloved feature for community engagement.
 * 
 * Characteristics:
 * - Simple question
 * - Radio button or checkbox options
 * - Results shown as bars with percentages
 * - Vote counts visible
 * - "View Results" for non-voters
 */
const PollWidget = () => {
  const options = [
    { label: 'Push/Pull/Legs', votes: 1247, percentage: 42 },
    { label: 'Upper/Lower', votes: 892, percentage: 30 },
    { label: 'Bro Split', votes: 534, percentage: 18 },
    { label: 'Full Body', votes: 298, percentage: 10 },
  ];
  
  return (
    <div style={{
      backgroundColor: COLORS.bgLighter,
      border: `1px solid ${COLORS.border}`,
      borderRadius: '4px',
      overflow: 'hidden',
    }}>
      <div style={{
        background: `linear-gradient(180deg, ${COLORS.bgLightest} 0%, ${COLORS.bgDark} 100%)`,
        padding: '8px 12px',
        borderBottom: `1px solid ${COLORS.border}`,
      }}>
        <div style={{
          color: COLORS.textPrimary,
          fontSize: TYPOGRAPHY.sizeMd,
          fontWeight: 'bold',
          fontFamily: TYPOGRAPHY.fontFamily,
        }}>
          📊 Poll: Best Training Split?
        </div>
      </div>
      
      <div style={{ padding: '12px' }}>
        {options.map((opt, i) => (
          <div key={i} style={{ marginBottom: '10px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '4px',
              fontSize: TYPOGRAPHY.sizeSm,
              fontFamily: TYPOGRAPHY.fontFamily,
            }}>
              <span style={{ color: COLORS.textSecondary }}>{opt.label}</span>
              <span style={{ color: COLORS.textMuted }}>
                {opt.votes.toLocaleString()} votes ({opt.percentage}%)
              </span>
            </div>
            <div style={{
              height: '14px',
              backgroundColor: COLORS.bgDeepest,
              borderRadius: '2px',
              border: `1px solid ${COLORS.border}`,
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${opt.percentage}%`,
                background: i === 0 
                  ? `linear-gradient(180deg, ${COLORS.accentGreen} 0%, #006600 100%)`
                  : `linear-gradient(180deg, ${COLORS.vbBlue} 0%, #223366 100%)`,
              }} />
            </div>
          </div>
        ))}
        
        <div style={{
          marginTop: '12px',
          paddingTop: '10px',
          borderTop: `1px solid ${COLORS.border}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ 
            fontSize: TYPOGRAPHY.sizeXs, 
            color: COLORS.textDark,
            fontFamily: TYPOGRAPHY.fontFamily,
          }}>
            2,971 total votes
          </span>
          <GlossyButton size="small">Vote</GlossyButton>
        </div>
      </div>
    </div>
  );
};

/**
 * ============================================================================
 * COMPONENT: ModToolsPanel
 * ============================================================================
 * 
 * MODERATOR TOOLS - For those with power.
 * 
 * Mods had special panels/dropdowns with actions like:
 * - Edit/delete posts
 * - Move/merge/split threads
 * - Ban users
 * - Issue warnings
 * - IP lookup
 * 
 * These were usually styled in a distinct color (red/green) to stand out.
 */
const ModToolsPanel = () => (
  <div style={{
    width: '200px',
    backgroundColor: COLORS.bgLighter,
    border: `2px solid ${COLORS.accentRed}`,
    borderRadius: '4px',
    overflow: 'hidden',
  }}>
    <div style={{
      background: `linear-gradient(180deg, #5a1a1a 0%, #401010 100%)`,
      padding: '8px 12px',
      borderBottom: `1px solid ${COLORS.accentRed}`,
    }}>
      <div style={{
        color: COLORS.accentRed,
        fontSize: TYPOGRAPHY.sizeMd,
        fontWeight: 'bold',
        fontFamily: TYPOGRAPHY.fontFamily,
      }}>
        ⚔️ Mod Tools
      </div>
    </div>
    
    <div style={{ padding: '8px' }}>
      {[
        { label: 'Edit Post', icon: '✏️' },
        { label: 'Delete Post', icon: '🗑️', danger: true },
        { label: 'Warn User', icon: '⚠️', danger: true },
        { label: 'Ban User', icon: '🔨', danger: true },
        { label: 'Move Thread', icon: '📁' },
        { label: 'Lock Thread', icon: '🔒' },
        { label: 'IP Lookup', icon: '🔍' },
      ].map((action, i) => (
        <div
          key={i}
          style={{
            padding: '6px 8px',
            fontSize: TYPOGRAPHY.sizeSm,
            fontFamily: TYPOGRAPHY.fontFamily,
            color: action.danger ? COLORS.accentRed : COLORS.textSecondary,
            cursor: 'pointer',
            borderRadius: '2px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>{action.icon}</span>
          {action.label}
        </div>
      ))}
    </div>
  </div>
);

/**
 * ============================================================================
 * MAIN COMPONENT: DesignReferenceShowcase
 * ============================================================================
 * 
 * This component arranges all the reference elements on a single page
 * for easy viewing and comparison. In a real application, these would
 * be spread across different pages/views.
 */
const DesignReferenceShowcase = () => {
  // Sample data for various components
  const sampleThreads = [
    { 
      title: 'Official: Post Your Current Physique Thread', 
      author: 'Admin_Zeus',
      replies: 24521,
      views: 892341,
      sticky: true,
      unread: true,
      lastPost: { author: 'NewGains2026', date: 'Today 03:45 PM' }
    },
    { 
      title: "Rate my 12-week transformation - 180 to 195 clean bulk",
      author: 'BulkSeason_Mike',
      replies: 847,
      views: 12453,
      hot: true,
      unread: true,
      lastPost: { author: 'SwoleBrah92', date: 'Today 03:42 PM' }
    },
    { 
      title: 'Why Starting Strength is overrated (here me out)',
      author: 'ControversialTake',
      replies: 2341,
      views: 45678,
      hot: true,
      unread: false,
      lastPost: { author: 'Rippetoe_Fan', date: 'Today 03:38 PM' }
    },
    { 
      title: 'Form check - Deadlift 405x3',
      author: 'FormCheckPlz',
      replies: 23,
      views: 412,
      unread: false,
      lastPost: { author: 'CoachMike', date: 'Today 03:21 PM' }
    },
  ];

  const menuItems = [
    { icon: '👤', label: 'View Profile' },
    { icon: '✉️', label: 'Send PM' },
    { icon: '📊', label: 'View Stats' },
    { icon: '📋', label: 'Training Log' },
    { icon: '⚠️', label: 'Report User', danger: true },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: COLORS.bgDark,
      fontFamily: TYPOGRAPHY.fontFamily,
      color: COLORS.textSecondary,
      // Subtle noise texture - very common in this era
      backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKMjIz/GZH4jAwMDIxwDrIAXBKuABkDADoHBANI3I6GAAAAAElFTkSuQmCC")',
    }}>
      {/* ================================================================
          HEADER SECTION
          ================================================================ */}
      <div style={{
        background: `linear-gradient(180deg, #2a3a5a 0%, #1a2540 50%, #0f1525 100%)`,
        borderBottom: `2px solid ${COLORS.vbBlue}`,
      }}>
        <div style={{
          maxWidth: '1024px',
          margin: '0 auto',
          padding: '16px',
        }}>
          {/* Logo area */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
          }}>
            <div style={{
              fontSize: TYPOGRAPHY.size3xl,
              fontWeight: 'bold',
              fontFamily: TYPOGRAPHY.fontFamilyDisplay,
              color: COLORS.accentOrange,
              textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(255,102,0,0.3)',
              letterSpacing: '2px',
            }}>
              ⚔️ IRON<span style={{ color: COLORS.textPrimary }}>TRACK</span>
              <span style={{ 
                fontSize: TYPOGRAPHY.sizeSm, 
                color: COLORS.textDark,
                fontFamily: TYPOGRAPHY.fontFamily,
                fontWeight: 'normal',
                marginLeft: '12px',
              }}>
                Design Reference v1.0
              </span>
            </div>
            
            {/* User status in header */}
            <div style={{ 
              fontSize: TYPOGRAPHY.sizeSm,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{ color: COLORS.onlineGreen }}>●</span>
              <span style={{ color: COLORS.textMuted }}>Welcome, </span>
              <span style={{ color: COLORS.accentOrange, fontWeight: 'bold' }}>IronJack_HTX</span>
              <span style={{ color: COLORS.textDark }}>|</span>
              <a href="#" style={{ color: COLORS.vbBlueLight }}>User CP</a>
              <span style={{ color: COLORS.textDark }}>|</span>
              <a href="#" style={{ color: COLORS.vbBlueLight }}>Log Out</a>
            </div>
          </div>
          
          {/* Navigation bar */}
          <div style={{
            display: 'flex',
            gap: '2px',
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: '0 8px',
            borderRadius: '3px',
          }}>
            {['Home', 'Forums', 'Training Logs', 'Gallery', 'Members', 'Search'].map((item, i) => (
              <div
                key={item}
                style={{
                  padding: '10px 16px',
                  backgroundColor: i === 0 ? COLORS.vbBlue : 'transparent',
                  color: i === 0 ? COLORS.textPrimary : COLORS.vbBlueLight,
                  fontSize: TYPOGRAPHY.sizeMd,
                  fontWeight: i === 0 ? 'bold' : 'normal',
                  cursor: 'pointer',
                  borderTop: i === 0 ? `2px solid ${COLORS.accentOrange}` : '2px solid transparent',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================
          MAIN CONTENT AREA
          ================================================================ */}
      <div style={{
        maxWidth: '1024px',
        margin: '0 auto',
        padding: '20px 16px',
      }}>
        {/* Alert examples */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            color: COLORS.textPrimary, 
            fontSize: TYPOGRAPHY.size2xl,
            marginBottom: '12px',
            borderBottom: `1px solid ${COLORS.border}`,
            paddingBottom: '8px',
          }}>
            Alert Banners
          </h2>
          <AlertBanner type="info">
            Welcome to IRONTRACK! Please read the <a href="#" style={{ color: COLORS.vbBlueLight }}>forum rules</a> before posting.
          </AlertBanner>
          <AlertBanner type="success">
            Your workout has been logged successfully! Keep grinding, brah! 💪
          </AlertBanner>
          <AlertBanner type="warning">
            Your subscription expires in 7 days. <a href="#" style={{ color: COLORS.accentYellow }}>Renew now</a> to keep your Premium status.
          </AlertBanner>
          <AlertBanner type="error">
            Failed to upload image. File size must be under 2MB.
          </AlertBanner>
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'flex', gap: '20px' }}>
          
          {/* Left column - Main content */}
          <div style={{ flex: 1 }}>
            
            {/* Thread list example */}
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ 
                color: COLORS.textPrimary, 
                fontSize: TYPOGRAPHY.size2xl,
                marginBottom: '12px',
                borderBottom: `1px solid ${COLORS.border}`,
                paddingBottom: '8px',
              }}>
                Thread List
              </h2>
              <div style={{
                backgroundColor: COLORS.bgMedium,
                border: `1px solid ${COLORS.border}`,
                borderRadius: '4px',
                overflow: 'hidden',
              }}>
                {/* Table header */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '30px 1fr 80px 80px 160px',
                  padding: '8px 10px',
                  background: `linear-gradient(180deg, ${COLORS.bgLightest} 0%, ${COLORS.bgDark} 100%)`,
                  borderBottom: `2px solid ${COLORS.vbBlue}`,
                  fontSize: TYPOGRAPHY.sizeSm,
                  fontWeight: 'bold',
                  color: COLORS.vbBlueLight,
                  textTransform: 'uppercase',
                }}>
                  <div></div>
                  <div>Thread</div>
                  <div style={{ textAlign: 'center' }}>Replies</div>
                  <div style={{ textAlign: 'center' }}>Views</div>
                  <div>Last Post</div>
                </div>
                
                {sampleThreads.map((thread, i) => (
                  <ThreadListItem key={i} thread={thread} index={i} />
                ))}
              </div>
            </div>

            {/* Quote and signature example */}
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ 
                color: COLORS.textPrimary, 
                fontSize: TYPOGRAPHY.size2xl,
                marginBottom: '12px',
                borderBottom: `1px solid ${COLORS.border}`,
                paddingBottom: '8px',
              }}>
                Quote Box & Signature
              </h2>
              <div style={{
                backgroundColor: COLORS.bgMedium,
                border: `1px solid ${COLORS.border}`,
                borderRadius: '4px',
                padding: '16px',
              }}>
                <QuoteBox 
                  author="SwoleBrah92"
                  content="Bro, you need to eat more. You're not gonna grow on 2000 calories. Trust me, I've been there."
                />
                <p style={{ 
                  color: COLORS.textSecondary, 
                  lineHeight: '1.6',
                  marginBottom: '16px',
                }}>
                  Yeah, you're right. I bumped it up to 3200 last week and I'm already seeing the scale move. 
                  The hardest part is eating that much clean food - my meal prep game needs work.
                </p>
                <Signature 
                  content={`5'10" / 192 lbs | B: 285 | S: 365 | D: 425 | Total: 1075
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"We're all gonna make it, brah" - Zyzz
Current Goal: 4/3/5 by end of 2026`}
                />
              </div>
            </div>

            {/* BBCode toolbar example */}
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ 
                color: COLORS.textPrimary, 
                fontSize: TYPOGRAPHY.size2xl,
                marginBottom: '12px',
                borderBottom: `1px solid ${COLORS.border}`,
                paddingBottom: '8px',
              }}>
                Post Editor (BBCode Toolbar)
              </h2>
              <div>
                <BBCodeToolbar />
                <textarea
                  style={{
                    width: '100%',
                    height: '120px',
                    backgroundColor: COLORS.bgDeepest,
                    border: `1px solid ${COLORS.border}`,
                    borderTop: 'none',
                    borderRadius: '0 0 3px 3px',
                    color: COLORS.textSecondary,
                    padding: '10px',
                    fontSize: TYPOGRAPHY.sizeMd,
                    fontFamily: TYPOGRAPHY.fontFamily,
                    resize: 'vertical',
                    boxSizing: 'border-box',
                  }}
                  placeholder="Enter your message here..."
                  defaultValue="[b]Today's workout:[/b]

Bench Press: 4x8 @ 225 lbs
Incline DB: 3x10 @ 75 lbs

[quote]Light weight baby![/quote]"
                />
                <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                  <GlossyButton>Submit Reply</GlossyButton>
                  <GlossyButton color="#666">Preview</GlossyButton>
                  <GlossyButton color="#993333">Cancel</GlossyButton>
                </div>
              </div>
            </div>

            {/* Progress bars */}
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ 
                color: COLORS.textPrimary, 
                fontSize: TYPOGRAPHY.size2xl,
                marginBottom: '12px',
                borderBottom: `1px solid ${COLORS.border}`,
                paddingBottom: '8px',
              }}>
                Progress Bars
              </h2>
              <div style={{
                backgroundColor: COLORS.bgMedium,
                border: `1px solid ${COLORS.border}`,
                borderRadius: '4px',
                padding: '16px',
              }}>
                <ProgressBar value={285} max={315} label="Bench Press Goal" color={COLORS.vbBlue} />
                <ProgressBar value={365} max={405} label="Squat Goal" color={COLORS.accentOrange} />
                <ProgressBar value={425} max={495} label="Deadlift Goal" color={COLORS.accentRed} />
                <ProgressBar value={192} max={200} label="Bodyweight Goal" color={COLORS.accentGreen} />
              </div>
            </div>

            {/* Forum stats */}
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ 
                color: COLORS.textPrimary, 
                fontSize: TYPOGRAPHY.size2xl,
                marginBottom: '12px',
                borderBottom: `1px solid ${COLORS.border}`,
                paddingBottom: '8px',
              }}>
                Forum Statistics
              </h2>
              <ForumStats />
            </div>
          </div>

          {/* Right column - Sidebar widgets */}
          <div style={{ width: '240px', flexShrink: 0 }}>
            
            {/* Login box */}
            <div style={{ marginBottom: '20px' }}>
              <LoginBox />
            </div>

            {/* Calendar */}
            <div style={{ marginBottom: '20px' }}>
              <ForumCalendar />
            </div>

            {/* Poll */}
            <div style={{ marginBottom: '20px' }}>
              <PollWidget />
            </div>

            {/* Online users */}
            <div style={{ marginBottom: '20px' }}>
              <OnlineUsers />
            </div>

            {/* Popup menu example */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ 
                color: COLORS.textPrimary, 
                fontSize: TYPOGRAPHY.sizeMd,
                marginBottom: '8px',
              }}>
                User Popup Menu
              </h3>
              <PopupMenu title="User Options" items={menuItems} />
            </div>

            {/* Mod tools */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ 
                color: COLORS.textPrimary, 
                fontSize: TYPOGRAPHY.sizeMd,
                marginBottom: '8px',
              }}>
                Moderator Tools
              </h3>
              <ModToolsPanel />
            </div>

            {/* Button showcase */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ 
                color: COLORS.textPrimary, 
                fontSize: TYPOGRAPHY.sizeMd,
                marginBottom: '8px',
              }}>
                Button Styles
              </h3>
              <div style={{
                backgroundColor: COLORS.bgLighter,
                border: `1px solid ${COLORS.border}`,
                borderRadius: '4px',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}>
                <GlossyButton size="small">Small Button</GlossyButton>
                <GlossyButton size="medium">Medium Button</GlossyButton>
                <GlossyButton size="large">Large Button</GlossyButton>
                <GlossyButton color={COLORS.accentOrange}>Orange</GlossyButton>
                <GlossyButton color={COLORS.accentGreen}>Success</GlossyButton>
                <GlossyButton color={COLORS.accentRed}>Danger</GlossyButton>
                <GlossyButton active>Active State</GlossyButton>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ================================================================
          FOOTER
          ================================================================ */}
      <div style={{
        backgroundColor: COLORS.bgDeepest,
        borderTop: `1px solid ${COLORS.border}`,
        padding: '20px 16px',
        marginTop: '40px',
      }}>
        <div style={{
          maxWidth: '1024px',
          margin: '0 auto',
          textAlign: 'center',
          fontSize: TYPOGRAPHY.sizeXs,
          color: COLORS.textDarkest,
          fontFamily: TYPOGRAPHY.fontFamily,
        }}>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ color: COLORS.onlineGreen }}>●</span>
            <span style={{ color: COLORS.textDark }}> 2,847 users online</span>
            <span style={{ color: COLORS.textDarkest }}> | Record: 12,455 (January 1, 2010)</span>
          </div>
          <div style={{ marginBottom: '8px' }}>
            Powered by vBulletin® Version 3.8.4 | Copyright ©2000 - 2026, Jelsoft Enterprises Ltd.
          </div>
          <div style={{ color: '#333' }}>
            All times are GMT -5. The time now is {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignReferenceShowcase;
