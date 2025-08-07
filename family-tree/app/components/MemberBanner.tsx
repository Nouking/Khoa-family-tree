import { useDrag } from 'react-dnd';
import { FamilyMember, ItemTypes } from '../../types';

interface MemberBannerProps {
  member: FamilyMember;
}

export default function MemberBanner({ member }: MemberBannerProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.MEMBER_CARD,
    item: { id: member.id, x: member.position.x, y: member.position.y },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      data-testid={`member-banner-${member.id}`}
      style={{
        position: 'absolute',
        left: member.position.x,
        top: member.position.y,
        width: member.size.width,
        height: member.size.height,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
      className="member-banner rounded-lg bg-white shadow-md border-2 border-transparent hover:border-blue-300 transition-all p-4"
    >
      <div className="banner-content flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <div className="photo-section flex justify-center mb-2 sm:mb-0">
          {member.photo ? (
            <img 
              src={member.photo} 
              alt={member.name}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600 text-base sm:text-xl">
                {member.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        
        <div className="info-section text-center sm:text-left">
          <h3 className="font-bold text-base sm:text-lg">{member.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{member.relationship || 'Member'}</p>
          {member.title && (
            <p className="text-xs text-gray-500 mt-0.5">{member.title}</p>
          )}
          {(member.birthDate || member.deathDate) && (
            <p className="text-xs text-gray-500 mt-1">
              {member.birthDate && `Born: ${member.birthDate}`}
              {member.deathDate && member.birthDate && ' • '}
              {member.deathDate && `Died: ${member.deathDate}`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 